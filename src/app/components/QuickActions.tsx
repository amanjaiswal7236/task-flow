import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, List, SortAsc } from "lucide-react"

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Button asChild variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
          <Link href="/tasks/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100">
          <Link href="/tasks" className="flex items-center">
            <List className="mr-2 h-4 w-4" />
            View All Tasks
          </Link>
        </Button>
        <Button variant="outline" className="bg-purple-50 text-purple-600 hover:bg-purple-100">
          <SortAsc className="mr-2 h-4 w-4" />
          Sort Tasks
        </Button>
      </CardContent>
    </Card>
  )
}