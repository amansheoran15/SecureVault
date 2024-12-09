import {Link} from 'react-router-dom';

import CardComponent from "../components/CardComponent.jsx"
import Button from "../components/Button.jsx"
import CardList from "../components/CardList.jsx"
import MoneyCard from "../assets/MoneyCard.png"
import IdCard from "../assets/IdCard.png"
import {useState} from "react";
import AddMoneyCard from "../components/AddMoneyCard.jsx";

export default function Dashboard() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div className="w-full md:w-[90%] m-auto my-2 p-2">
                <h1 className="text-2xl font-medium italic text-gray-700">Categories</h1>
                <hr className="my-2 h-1 bg-gray-700"/>
                <div className="flex items-center justify-center gap-4 flex-wrap lg:gap-6 p-6">
                    <CardComponent heading={"Money Cards"} image={MoneyCard}>
                        <Link to="/list">
                            <Button label="View Cards" type="dark"></Button>
                        </Link>
                        <Button label="Add Card" type="light" onClick={() => setOpenModal(true)}></Button>
                        <AddMoneyCard openModal={openModal} setOpenModal={setOpenModal}/>
                    </CardComponent>

                    <CardComponent heading={"ID Cards"} image={IdCard}>
                        <Link to="/list">
                            <Button label="View Cards" type="dark"></Button>
                        </Link>
                        <Link to="/addForm">
                            <Button label="Add Card" type="light"></Button>
                        </Link>
                    </CardComponent>
                </div>
            </div>

            {/*recently added cards */}
            <div className="w-full md:w-[90%] m-auto my-2 p-2">
                <h1 className="text-2xl font-medium italic text-gray-700">Recently Added</h1>
                <hr className="my-2 h-1 bg-gray-700"/>
                <div className="flex items-center justify-center gap-4 flex-wrap lg:gap-6 p-6">
                    <CardList editable={true}/>
                </div>
            </div>
        </>
    )
}