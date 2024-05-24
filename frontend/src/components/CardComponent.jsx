"use client";

import {Card} from "flowbite-react";

export default function CardComponent({heading = "Credit Heading", image, children}){
    return (
        <Card className="max-w-[400px] flex items-center justify-center">
            <h5 className="text-3xl text-center font-bold text-gray-900 dark:text-white">{heading}</h5>
            <div className="flex items-center justify-center w-full">
                <img className="w-[60%] md:w-[50%] p-3" src={image} alt={heading}/>
            </div>
            <div className="flex justify-center mt-1 items-center space-x-3 lg:mt-4">
                {
                    children
                }
            </div>
        </Card>
    );
}
