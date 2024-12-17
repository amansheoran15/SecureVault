"use client";

import { Table } from "flowbite-react";
import { MdDeleteOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import AddMoneyCard from "./AddMoneyCard.jsx";
import {useEffect, useState} from "react";
import {useData} from "../hooks/useData.js";
import {decrypt, getKey} from "./UtilityFunctions.jsx";
import EditMoneyCard from "./EditMoneyCard.jsx";
import {useRecoilValue} from "recoil";
import {authAtom} from "../atoms/authAtom.js";

export default function CardList({ editable }){
    const { user } = useRecoilValue(authAtom);
    const { fetchData } = useData();
    const [cards, setCards] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetchData();
                const resArr = res.data;
                const aesKey = await getKey(user.email);

                // Use Promise.all to handle async operations in the array
                const data = await Promise.all(
                    resArr.map(async (card) => {
                        const info = await decrypt(aesKey, card.iv, card.data);
                        return { ...info, id: card._id }; // Return a new object with decrypted info and ID
                    })
                );

                setCards(data); // Set state after all decryption is complete
            } catch (error) {
                console.error("Error fetching or decrypting data:", error);
            }
        };

        getData();
    }, []);

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

    return (
        <div className="overflow-x-auto max-w-5xl mx-auto w-full">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>S. No.</Table.HeadCell>
                    <Table.HeadCell>Nickname</Table.HeadCell>
                    <Table.HeadCell>Card Number</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">View</span>
                        {editable &&
                        <>
                            <span className="sr-only">Edit</span>
                            <span className="sr-only">Delete</span>
                        </>
                        }
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {cards.map((card, index) => {
                    return (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {card.nickname}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {card.card_no}
                                </Table.Cell>
                                <Table.Cell>{card.type}</Table.Cell>
                                <Table.Cell className = "flex text-lg">
                                    <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                                        <FaEye/>
                                    </span>

                                    { editable &&
                                    (<>
                                        <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-3" onClick={() => handleOpenModal(card)}>
                                        <BiSolidEdit />
                                        </div>
                                        <EditMoneyCard openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal} cardData={selectedData} handleUpdate={updateCard}/>

                                        <div className="font-medium text-red-600 hover:underline dark:text-cyan-500 ml-3">
                                            <MdDeleteOutline />
                                        </div>
                                    </>)
                                    }
                                </Table.Cell>
                            </Table.Row>
                    );
                })}
                </Table.Body>
            </Table>
        </div>
    );
}