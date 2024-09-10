import {useState} from 'react'
import {motion} from "framer-motion"
import CardChip from '../assets/CardChip.png';
import MasterCard from '../assets/MasterCard.svg'

export default function MoneyCard({type, bank, tagline, cardNumber, FirstName, MiddleName, LastName, validThru, cvv }){
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleFlip(){
        if(!isAnimating){
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
        }
    }

    return (
        <>
                <div className="flip-card min-h-[265px] min-w-[420px] cursor-pointer select-none" onDoubleClick={handleFlip}>
                    <motion.div
                        className='flip-card-inner'
                        initial={false}
                        animate={{rotateY: isFlipped ? 180: 360}}
                        transition={{duration: 0.6, animationDirection: "normal"}}
                        onAnimationComplete={() => setIsAnimating(false)}
                    >
                        {/*Card front-side*/}
                        <div
                            className="flip-card-front flex flex-col gap-4 justify-between max-w-md min-h-[265px] w-[100%] h-[100%] mx-auto shadow-lg overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg py-3 p-6">
                            <div className="flex justify-between gap-2 items-center">
                                <div className="flex justify-start gap-2 items-center flex-1">
                                    <h1 className="text-white font-bold text-3xl">{bank}</h1>
                                    <p className="text-gray-400 text-3xl">l</p>
                                    <span className="text-gray-400 text-2xl font-semibold">{tagline}</span>
                                </div>
                            </div>
                            <img src={CardChip} className="w-14 h-10" alt="card chip"/>
                            <div className="text-center my-2">
                <span
                    className="text-3xl font-semibold bg-gradient-to-tr from-gray-50 via-gray-400 to-gray-50 bg-clip-text text-transparent">{cardNumber}</span>
                            </div>
                            <div className="flex gap-2 justify-between items-center">
                                <div className="flex flex-col justify-between text-gray-400">
                                    <div className="flex items-center justify-start">
                                        <div className="mr-2 text-[12px]">
                                            <p className="bg-gradient-to-tr from-gray-50 via-gray-200 to-gray-50 bg-clip-text text-transparent m-0 p-0 leading-none uppercase">valid</p>
                                            <p className="bg-gradient-to-tr from-gray-50 via-gray-200 to-gray-50 bg-clip-text text-transparent m-0 p-0 leading-none uppercase">thru</p>
                                        </div>
                                        <span
                                            className="bg-gradient-to-tr from-gray-50 via-gray-400 to-gray-50 bg-clip-text text-transparent text-md font-bold">{validThru.month}/{validThru.year}</span>
                                    </div>
                                    <p className="font-bold uppercase text-2xl mb-2 bg-gradient-to-tr from-gray-50 via-gray-400 to-gray-50 bg-clip-text text-transparent">{FirstName} {MiddleName} {LastName}</p>
                                </div>
                                <img src={MasterCard} className="w-24 h-16" alt="Master_Card"/>
                            </div>
                        </div>

                        {/*Card back-side*/}
                        <div
                            className="flip-card-back flex flex-col gap-4 justify-start max-w-md min-h-[265px] w-[100%] h-[100%] mx-auto shadow-lg overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg py-3">
                                <div className="mt-6 w-full h-14 bg-black"></div>
                                <div className="flex">
                                    <div className="w-[50%] h-10 bg-white"></div>
                                    <div
                                        className="w-[15%] bg-gray-400 text-center text-2xl text-gray-800 font-bold italic p-0.5 tracking-wider">{cvv}</div>
                                </div>
                        </div>
                    </motion.div>
                </div>
        </>
    );
};


// bg-gradient-to-tr from-zinc-900 to-gray-700
// bg-gradient-to-tr from-slate-900 to-slate-700
// bg-gradient-to-tr from-[#080C17] to-[#151C29]
