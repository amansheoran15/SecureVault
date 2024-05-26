"use client";

import { Button } from "flowbite-react";
import CardList from "../components/CardList.jsx";

export default function ViewCard({ title = "Cards" }) {
    return (
        <div className="w-4/5 max-w-5xl flex flex-col justify-center mt-10 m-auto">
            <div id="heading" className="font-semibold text-4xl mb-5">
                {title}
            </div>
            <CardList editable={true}></CardList>
            <div id="add-new" className="flex flex-row-reverse mt-4">
                <Button color="failure">ADD</Button>
            </div>
        </div>
    );
}