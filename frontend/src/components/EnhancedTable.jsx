import {useState, useMemo, useEffect} from 'react'
import { Eye, Pencil, Trash } from 'lucide-react'
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {decrypt, getKey} from "./UtilityFunctions.jsx";
import {useData} from "../hooks/useData.js";
import {useRecoilValue} from "recoil";
import {authAtom} from "../atoms/authAtom.js";
import MoneyCard from "./MoneyCard.jsx";
import EditMoneyCard from "./EditMoneyCard.jsx";
import { Loader } from './ui/Loader'

// const recentItems = [
//   {
//     id: 1,
//     nickname: "Personal Debit",
//     cardNumber: "XXXX-XXXX-XXXX-1234",
//     category: "Debit Card",
//     cardType: 'visa',
//     expiryDate: '12/25',
//     cvv: '123'
//   },
//   {
//     id: 2,
//     nickname: "Work Credit",
//     cardNumber: "XXXX-XXXX-XXXX-5678",
//     category: "Credit Card",
//     cardType: 'mastercard',
//     expiryDate: '06/24',
//     cvv: '456'
//   },
// ]

function CardDetails({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
      <div
          className="w-96 h-56 perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
            }`}
        >
          {/* Front side */}
          <div className="absolute w-full h-full backface-hidden">
            <Card className="w-full h-full bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground">
              <CardHeader>
                <CardTitle>{card.nickname}</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {card.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-mono">{card.cardNumber}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p>Exp: {card.expiryDate}</p>
                  <img
                      src={`/${card.cardType}.svg`}
                      alt={card.cardType}
                      width={60}
                      height={40}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back side */}
          <div className="absolute w-full h-full backface-hidden transform rotate-y-180">
            <Card className="w-full h-full bg-gradient-to-br from-secondary to-secondary-foreground text-secondary-foreground">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">CVV</p>
                  <p className="text-3xl font-mono">{card.cvv}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}

export function EnhancedTable({ cardType, searchTerm, editable = false }) {
  const { user} = useRecoilValue(authAtom);
  const { fetchData, deleteData } = useData();
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [loading, setLoading] = useState(true);

  // const filteredItems = cards;
  const filteredItems = useMemo(() => {
    return cards.filter(item => {
      if(!cardType && !searchTerm)
        return true;

      const matchesType = !cardType ||
        (cardType === 'money' && ['Credit Card', 'Debit Card'].includes(item.type)) ||
        (cardType === 'id' && item.category === 'ID Card');
      const matchesSearch = !searchTerm ||
        item.nickname.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [cards, cardType, searchTerm]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData();
        const resArr = res.data;
        const aesKey = await getKey(user.email);

        const data = await Promise.all(
            resArr.map(async card => {
              const info = await decrypt(aesKey, card.iv, card.data);
              return { ...info, id: card._id };
            })
        );

        setCards(data);
      } catch (error) {
        console.error("Error fetching or decrypting data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after data fetch
      }
    };

    getData();
  }, []); // Add `user` to the dependency array

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData(null);
  }

  const updateCard = (cardData) =>{
    const newCards = cards.map((card) => {
      if(card.id !== cardData.id){
        return card;
      }else{
        return cardData;
      }
    })
    // console.log(newCards);
    setCards(newCards);
  }

  const deleteCard = async (cardID) => {
    try{
      await deleteData(cardID);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardID));

    }catch (e) {

    }
  }

  if(loading){
    return <Loader />
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[80px] font-semibold">S.NO.</TableHead>
            <TableHead className="font-semibold">NICKNAME</TableHead>
            <TableHead className="font-semibold">CARD NUMBER</TableHead>
            <TableHead className="font-semibold">CATEGORY</TableHead>
            <TableHead className="text-right font-semibold">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={item.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.nickname}</TableCell>
              <TableCell>
                <span className="font-mono text-sm">{item.card_no}</span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {item.type}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                        <Eye className="h-4 w-4 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Card Details</DialogTitle>
                        <DialogDescription>View your card information</DialogDescription>
                      </DialogHeader>
                      {/*<CardDetails card={item} />*/}
                      <MoneyCard
                          type={item.cardType}
                          bank="SecureVault"
                          tagline="Your Secure Financial Partner"
                          cardNumber={item.card_no}
                          FirstName={item.first_name}
                          MiddleName={item.middle_name}
                          LastName={item.last_name}
                          validThru={{
                            month: item.expiry_date.split('/')[0],
                            year: item.expiry_date.split('/')[1]
                          }}
                          cvv={item.cvv}
                      />
                    </DialogContent>
                  </Dialog>
                  {
                    editable && (
                        <>
                          <Button variant="ghost" size="icon" className="hover:bg-primary/20" onClick={() => handleOpenModal(item)}>
                            <Pencil className="h-4 w-4 text-primary" />
                          </Button>

                          <Button variant="ghost" size="icon" className="hover:bg-destructive/20" onClick={() => deleteCard(item.id)}>
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )
                  }
                  <EditMoneyCard openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal} cardData={selectedData} handleUpdate={updateCard}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}