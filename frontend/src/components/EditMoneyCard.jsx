
"use client";

import {Button, Label, Modal, Select, TextInput} from "flowbite-react";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import {get, useForm} from "react-hook-form";
import {useState} from "react";


export default function EditMoneyCard({ openModal, setOpenModal }) {
    // const [card, setCard] = useState('')
    // const [date, setDate] = useState('')
    const { register, handleSubmit, formState : {errors}, getValues, watch, setValue } = useForm({ mode: "onChange"});

    const card = watch("card_no") === undefined ? "" : watch("card_no");
    const date = watch("expiry_date") === undefined ? "" : watch("expiry_date");
    const onSubmitCallback = (data)=>{
        console.log(data);
    }
    const handleCardDisplay = () => {
        const rawText = [...card.split(' ').join('')] // Remove old space
        const creditCard = [] // Create card as array
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
            creditCard.push(t)
        })
        const finalAns = creditCard.join('');
        return finalAns;// Transform card array to string
    }
    function onChangeCard(e){
        const re = /^[0-9\b ]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            // setCard(e.target.value)
            setValue("card_no", e.target.value)
            console.log(e.target.value)
        }
    }
    const handleExpiryDate = () => {
        const tempDate = date === undefined ? '' : date;
        const rawText = [...tempDate.split('/').join('')] // Remove old space
        const formattedDate = [] // Create card as array
        rawText.forEach((t, i) => {
            if (i % 2 === 0 && i !== 0) formattedDate.push('/') // Add space
            formattedDate.push(t)
        })
        return formattedDate.join('') // Transform card array to string
    }
    function onChangeDate(e){
        const re = /^[0-9\b/]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            if(e.target.value.length === 1 && parseInt(e.target.value) > 1){
                e.target.value = '0'+e.target.value;
            }
            setValue('expiry_date',e.target.value)
        }
    }

    return (
        <>
            <Modal show={openModal} size="3xl" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">Add New Card</h3>
                    <form onSubmit={handleSubmit(onSubmitCallback)}>
                    <div className="text-center grid">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="text-left">
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="nickname" value="Nickname"/>
                                </div>
                                <TextInput
                                    id="nickname"
                                    {...register("nickname", {
                                        required: "This is a required field",
                                        minLength: {
                                            value: 4,
                                            message: "Nickname must be at least 4 characters"
                                        }
                                    })}
                                    color={errors.nickname ? "failure" : undefined}
                                    helperText={errors.nickname ? <span className="text-left"> {errors.nickname.message}</span> : undefined}
                                    shadow
                                    placeholder="John's Credit Card"
                                />
                            </div>
                            <div>
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="type" value="Card Type"/>
                                </div>
                                <Select
                                    id="type"
                                    {...register("type")}
                                >
                                    <option>Debit Card</option>
                                    <option>Credit Card</option>
                                </Select>
                            </div>
                        </div>
                        <div className="col-span-1 mt-4 text-left">
                            <div className="mb-2 block text-left">
                                <Label htmlFor="card-no" value="Card Number"/>
                            </div>
                            <TextInput
                                id="card-no"
                                placeholder="4242 4242 4242 4242"
                                {...register("card_no",{
                                    required: "This is a required field",
                                    validate: (data)=>{
                                        if(data.length !== 17 && data.length !== 19){
                                            return "Enter a valid card number";
                                        }
                                        return true;
                                    }
                                })}
                                color={errors.card_no ? "failure" : undefined}
                                helperText={errors.card_no ? <span className="text-left"> {errors.card_no.message}</span> : undefined}
                                value={handleCardDisplay()}
                                onChange={onChangeCard}
                                maxLength="19"
                                rightIcon={card.length >= 9 ? () => {
                                    if(card[0] === '4') return <RiVisaLine />;
                                    else if(card[0] === '5') return <FaCcMastercard />;
                                    else return undefined;
                                }: undefined}

                            />
                        </div>
                        <div className="grid grid-cols-3 mt-4 gap-4 text-left">
                            <div className="text-left">
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="first-name" value="First Name"/>
                                </div>
                                <TextInput
                                    id="first-name"
                                    placeholder="John"
                                    {...register("first_name", {
                                        required: "This is a required field",
                                        minLength: {
                                            value: 2,
                                            message: "First Name must be at least 2 characters"
                                        }
                                    })}
                                    color={errors.first_name ? "failure" : undefined}
                                    helperText={errors.first_name ? <> {errors.first_name.message}</> : undefined}
                                    shadow
                                />
                            </div>
                            <div>
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="middle-name" value="Middle Name"/>
                                </div>
                                <TextInput
                                    id="middle-name"
                                    placeholder="Kumar"
                                    {...register("middle_name", )}

                                />
                            </div>
                            <div>
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="last-name" value="Last Name"/>
                                </div>
                                <TextInput
                                    id="last-name"
                                    placeholder="Doe"
                                    {...register("last_name", {
                                        required: "This is a required field",
                                    })}
                                    color={errors.last_name ? "failure" : undefined}
                                    helperText={errors.last_name ? <span className="text-left"> {errors.last_name.message}</span> : undefined}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 mt-4 gap-10">
                            <div className="text-left">
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="expiry-date" value="Valid Thru"/>
                                </div>

                                <TextInput
                                    id="expiry-date"
                                    placeholder="01/30"
                                    {...register("expiry_date", {
                                        required: "This is a required field",
                                        validate: (data)=>{
                                            if(data.length !== 5){
                                                return "Enter a valid expiry date";
                                            }
                                            return true;
                                        }
                                    })}
                                    color={errors.expiry_date ? "failure" : undefined}
                                    helperText={errors.expiry_date ? <span className="text-left"> {errors.expiry_date.message}</span> : undefined}
                                    value={handleExpiryDate()}
                                    onChange={onChangeDate}
                                    maxLength="5"
                                />
                            </div>
                            <div className="text-left">
                                <div className="mb-2 block text-left">
                                    <Label htmlFor="cvv" value="CVV"/>
                                </div>
                                <TextInput
                                    id="cvv"
                                    placeholder="XXX"
                                    type="password"
                                    {...register("cvv", {
                                        required: "This is a required field",
                                        pattern:{
                                           value: /^[0-9\b]+$/,
                                           message: "CVV must contain only digits"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "CVV must be of 3 digits"
                                        },
                                        maxLength:{
                                            value: 3,
                                            message: "CVV must be of 3 digits"
                                        },

                                    })}
                                    color={errors.cvv ? "failure" : undefined}
                                    helperText={errors.cvv ? <span className="text-left"> {errors.cvv.message}</span> : undefined}
                                    maxLength="3"
                                />
                            </div>
                        </div>
                        <div id="submit-btn" className="flex justify-center items-center mt-8">
                            <Button type="submit" color="success">Add</Button>
                        </div>
                    </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
