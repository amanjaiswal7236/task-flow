import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, Clock, CheckCircle, Calendar } from "lucide-react"
import type { Task } from "../action"
import { cn } from "@/lib/utils"

export default function TaskMetrics({ tasks }: { tasks: Task[] }) {
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((task) => task.status === "Not Started" || task.status === "In Progress").length
  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const dueTodayTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0]
    return task.dueDate === today
  }).length

  const metrics = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Due Today",
      value: dueTodayTasks,
      icon: Calendar,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="flex items-center p-6">
            <div className={cn("p-2 rounded-lg", metric.bgColor)}>
              <metric.icon className={cn("w-6 h-6", metric.color)} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

