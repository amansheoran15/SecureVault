import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RiVisaLine } from 'react-icons/ri'
import { FaCcMastercard } from 'react-icons/fa6'
import { useRecoilValue } from 'recoil'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog'

import { getKey, encrypt } from './UtilityFunctions.jsx'
import { useData } from '../hooks/useData.js'
import { authAtom } from '../atoms/authAtom.js'

export default function EditMoneyCard({ openModal, setOpenModal, cardData, handleCloseModal, handleUpdate }) {
    const { user } = useRecoilValue(authAtom)
    const { updateData } = useData()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        mode: 'onChange',
    })

    useEffect(() => {
        if (cardData) {
            reset({
                nickname: cardData.nickname || '',
                card_no: cardData.card_no || '',
                first_name: cardData.first_name || '',
                middle_name: cardData.middle_name || '',
                last_name: cardData.last_name || '',
                expiry_date: cardData.expiry_date || '',
                cvv: cardData.cvv || '',
                type: cardData.type || 'Debit Card',
            })
        }
    }, [cardData, reset])

    const card = watch('card_no') || ''
    const date = watch('expiry_date') || ''

    const onSubmitCallback = async (data) => {
        const aesKey = await getKey(user.email)
        data.id = cardData.id
        const encryptedData = await encrypt(aesKey, JSON.stringify(data))

        const payload = {
            data: encryptedData.Data,
            iv: encryptedData.iv,
            nickname: data.nickname,
            type: data.type
        }

        await updateData(cardData.id, payload)
        handleUpdate(data)
        handleCloseModal()
    }

    const handleCardDisplay = () => {
        const rawText = [...card.split(' ').join('')]
        const creditCard = []
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ')
            creditCard.push(t)
        })
        return creditCard.join('')
    }

    const onChangeCard = (e) => {
        const re = /^[0-9\b ]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            setValue('card_no', e.target.value)
        }
    }

    const handleExpiryDate = () => {
        const tempDate = date
        const rawText = [...tempDate.split('/').join('')]
        const formattedDate = []
        rawText.forEach((t, i) => {
            if (i % 2 === 0 && i !== 0) formattedDate.push('/')
            formattedDate.push(t)
        })
        return formattedDate.join('')
    }

    const onChangeDate = (e) => {
        const re = /^[0-9\b/]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            if (e.target.value.length === 1 && parseInt(e.target.value) > 1) {
                e.target.value = '0' + e.target.value
            }
            setValue('expiry_date', e.target.value)
        }
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-center">Edit Card Details</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmitCallback)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nickname">Nickname</Label>
                            <Input
                                id="nickname"
                                {...register('nickname', {
                                    required: 'This is a required field',
                                    minLength: {
                                        value: 4,
                                        message: 'Nickname must be at least 4 characters'
                                    }
                                })}
                                placeholder="John's Credit Card"
                            />
                            {errors.nickname && (
                                <p className="text-sm text-red-500">{errors.nickname.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Card Type</Label>
                            <Select onValueChange={(value) => setValue('type', value)} defaultValue={watch('type')}>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select card type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="card_no">Card Number</Label>
                        <div className="relative">
                            <Input
                                id="card_no"
                                {...register('card_no', {
                                    required: 'This is a required field',
                                    validate: (data) => {
                                        if (data.length !== 17 && data.length !== 19) {
                                            return 'Enter a valid card number'
                                        }
                                        return true
                                    }
                                })}
                                value={handleCardDisplay()}
                                onChange={onChangeCard}
                                maxLength="19"
                                placeholder="4242 4242 4242 4242"
                            />
                            {card.length >= 9 && (
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {card[0] === '4' ? <RiVisaLine size={24} /> : card[0] === '5' ? <FaCcMastercard size={24} /> : null}
                </span>
                            )}
                        </div>
                        {errors.card_no && (
                            <p className="text-sm text-red-500">{errors.card_no.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                {...register('first_name', {
                                    required: 'This is a required field',
                                    minLength: {
                                        value: 2,
                                        message: 'First Name must be at least 2 characters'
                                    }
                                })}
                                placeholder="John"
                            />
                            {errors.first_name && (
                                <p className="text-sm text-red-500">{errors.first_name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="middle_name">Middle Name</Label>
                            <Input
                                id="middle_name"
                                {...register('middle_name')}
                                placeholder="Kumar"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                {...register('last_name', {
                                    required: 'This is a required field',
                                })}
                                placeholder="Doe"
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-500">{errors.last_name.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry_date">Valid Thru</Label>
                            <Input
                                id="expiry_date"
                                {...register('expiry_date', {
                                    required: 'This is a required field',
                                    validate: (data) => {
                                        if (data.length !== 5) {
                                            return 'Enter a valid expiry date'
                                        }
                                        return true
                                    }
                                })}
                                value={handleExpiryDate()}
                                onChange={onChangeDate}
                                maxLength="5"
                                placeholder="01/30"
                            />
                            {errors.expiry_date && (
                                <p className="text-sm text-red-500">{errors.expiry_date.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                                id="cvv"
                                type="password"
                                {...register('cvv', {
                                    required: 'This is a required field',
                                    pattern: {
                                        value: /^[0-9\b]+$/,
                                        message: 'CVV must contain only digits'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'CVV must be of 3 digits'
                                    },
                                    maxLength: {
                                        value: 3,
                                        message: 'CVV must be of 3 digits'
                                    },
                                })}
                                maxLength="3"
                                placeholder="XXX"
                            />
                            {errors.cvv && (
                                <p className="text-sm text-red-500">{errors.cvv.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-full sm:w-auto">Update</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

