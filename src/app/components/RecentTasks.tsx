import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Task } from "../action"
import { cn } from "@/lib/utils"

const statusStyles = {
  "Not Started": "bg-gray-100 text-gray-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  "On Hold": "bg-orange-100 text-orange-800",
  Cancelled: "bg-red-100 text-red-800",
}

export default function RecentTasks({ tasks }: { tasks: Task[] }) {
  const recentTasks = tasks.slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tasks</CardTitle>
        <Link href="/tasks" className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentTasks.map((task) => (
            <li key={task.title} className="flex items-center justify-between">
              <div>
                <p className={cn("font-medium", task.status === "Completed" && "line-through text-gray-500")}>
                  {task.title}
                </p>
                <p className="text-sm text-gray-500">Due {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <Badge className={statusStyles[task.status]}>{task.status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

