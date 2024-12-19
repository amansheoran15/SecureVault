import { CreditCard, FileText, Plus, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "./ui/card"
import AddMoneyCard from "./AddMoneyCard.jsx";
import {useState} from "react";

export function SecureCard({ title, description, type, count = 0 }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card className="relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transition-opacity duration-300 ease-in-out opacity-50 hover:opacity-75 pointer-events-none" />
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="mt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-center py-6">
          {type === "money"? (
            <CreditCard className="h-20 w-20 text-primary transition-transform duration-300 ease-in-out hover:scale-110" />
          ) : (
            <FileText className="h-20 w-20 text-primary transition-transform duration-300 ease-in-out hover:scale-110" />
          )}
        </div>
        <div className="text-center text-sm font-medium text-muted-foreground">
          {count} items stored securely
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Link to={`/cards/`}>
          <Button 
            variant="outline" 
            className="transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground cursor-pointer"
          >
            View Cards
          </Button>
        </Link>
        <Button
          className="transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
        <AddMoneyCard openModal={openModal} setOpenModal={setOpenModal}/>
      </CardFooter>
    </Card>
  )
}