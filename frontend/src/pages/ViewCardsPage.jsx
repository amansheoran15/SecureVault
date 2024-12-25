import {useEffect, useState} from 'react'
import { EnhancedTable } from "../components/EnhancedTable"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Button } from "../components/ui/button"
import AddMoneyCard from "../components/AddMoneyCard.jsx"

export default function ViewCardsPage() {
  const [filter, setFilter] = useState({ category: 'all', search: '' })
  const [openAddModal, setOpenAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
            //handling refresh
    }, [refreshKey]);

  const handleCategoryChange = (value) => {
    setFilter(prev => ({ ...prev, category: value }))
  }

  const handleSearchChange = (event) => {
    setFilter(prev => ({ ...prev, search: event.target.value }))
  }

  return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">View Cards</h1>
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="money">Money Cards</SelectItem>
                {/*<SelectItem value="id">ID Cards</SelectItem>*/}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-2/3">
            <Label htmlFor="search">Search</Label>
            <Input
                id="search"
                placeholder="Search by nickname..."
                value={filter.search}
                onChange={handleSearchChange}
            />
          </div>
        </div>
        <EnhancedTable cardType={filter.category === 'all' ? undefined : filter.category} searchTerm={filter.search}
                       editable={true}/>
        <div className="mt-8 flex justify-center">
          <Button onClick={() => setOpenAddModal(true)}>Add New Card</Button>
        </div>
        <AddMoneyCard openModal={openAddModal} setOpenModal={setOpenAddModal} handleRefresh={setRefreshKey}/>
      </div>
  )
}