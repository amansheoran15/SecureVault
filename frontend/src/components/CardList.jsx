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


export default function CardList({ editable }){
    const { fetchData } = useData();
    const [cards, setCards] = useState([]);
    useEffect(()=>{
        // setCards([])
        const getData = async () => {
            const res = await fetchData();
            console.log("fetch data: ", res);
            const resArr = res.data;
            const aesKey = await getKey("test@gmail.com");
            const data = []

            resArr.map(async (card) => {
                const info = await decrypt(aesKey, card.iv, card.data);
                info.id = card._id
                console.log(info);
                data.push(info)
            })
            setCards(data)
        }
        getData();
    }, [])
    // const cards = [
    //     {
    //         card_no : "XXXX-XXXX-XXXX-1234",
    //         category: "Debit Card",
    //         name: "Rupesh's Debit Card"
    //     },{
    //         card_no : "XXXX-XXXX-XXXX-1234",
    //         category: "Credit Card",
    //         name: "Rupesh's Debit Card"
    //     },{
    //         card_no : "XXXX-XXXX-XXXX-1234",
    //         category: "Debit Card",
    //         name: "Rupesh's Debit Card"
    //     },
    //
    // ];
    const [openModal, setOpenModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    const handleOpenModal = (data) => {
        setSelectedData(data);
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setSelectedData(null);
        setOpenModal(false);
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
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-3"  onClick={() => handleOpenModal(card)}>
                                        <BiSolidEdit />
                                        </a>
                                        <EditMoneyCard openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal} cardData={selectedData}/>

                                        <a href="#" className="font-medium text-red-600 hover:underline dark:text-cyan-500 ml-3">
                                            <MdDeleteOutline />
                                        </a>
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