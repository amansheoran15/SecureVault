import { EnhancedTable } from "../components/EnhancedTable"
import { SecureCard } from "../components/SecureCard"
import { Plus } from 'lucide-react'
import { Button } from "../components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          </div>
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="flex space-x-6 min-w-max">
              <SecureCard
                title="Money Cards"
                description="Securely store your credit, debit, and other payment cards"
                type="money"
                count={3}
              />
              <SecureCard
                title="ID Cards"
                description="Safely store your identification and membership cards"
                type="id"
                count={2}
              />
              <div className="w-64 h-64 flex items-center justify-center">
                <Button variant="outline" size="lg" className="w-full h-full flex flex-col items-center justify-center">
                  <Plus className="w-12 h-12 mb-2" />
                  <span>Add New Category</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Recently Added</h2>
            <EnhancedTable />
          </div>
        </div>
      </main>
    </div>
  )
}

