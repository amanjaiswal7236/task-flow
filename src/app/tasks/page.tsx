import { getTasks } from "../action"
import TaskList from "../components/TaskList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function TasksPage() {
  const tasks = await getTasks()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">All Tasks</h1>
        <Button asChild>
          <Link href="/tasks/new">Add New Task</Link>
        </Button>
      </div>
      <TaskList tasks={tasks} />
    </div>
  )
}

