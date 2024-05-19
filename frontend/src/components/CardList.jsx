"use client";

import { Table } from "flowbite-react";
import { MdDeleteOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import {Fa0} from "react-icons/fa6";

export default function CardList({ editable }){
    const cards = [
        {
            card_no : "XXXX-XXXX-XXXX-1234",
            category: "Debit Card"
        },{
            card_no : "XXXX-XXXX-XXXX-1234",
            category: "Credit Card"
        },{
            card_no : "XXXX-XXXX-XXXX-1234",
            category: "Debit Card"
        },

    ];
    return (
        <div className="overflow-x-auto max-w-5xl mx-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>S. No.</Table.HeadCell>
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
                                    {card.card_no}
                                </Table.Cell>
                                <Table.Cell>{card.category}</Table.Cell>
                                <Table.Cell className = "flex text-lg">
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ">
                                        <FaEye/>
                                    </a>

                                    { editable &&
                                    (<>
                                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-3">
                                        <BiSolidEdit />
                                        </a>
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