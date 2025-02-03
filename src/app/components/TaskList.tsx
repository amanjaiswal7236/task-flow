"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { deleteTask, updateTask, type Task, type TaskStatus } from "../action"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit2, Calendar, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
  tags: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskSchema>

const statusColors: Record<TaskStatus, string> = {
  "Not Started": "bg-gray-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
  "On Hold": "bg-orange-500",
  Cancelled: "bg-red-500",
}

export default function TaskList({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const router = useRouter()

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  })

  const handleDelete = async (taskId: string) => {
    const formData = new FormData()
    formData.append("id", taskId)
    await deleteTask(formData)
    setTasks(tasks.filter((task) => task._id !== taskId))
    router.refresh()
  }

  const handleUpdate = async (data: TaskFormValues) => {
    if (!editingTask) return

    const formData = new FormData()
    formData.append("id", editingTask._id)
    formData.append("title", data.title)
    formData.append("description", data.description || "")
    formData.append("dueDate", data.dueDate)
    formData.append("status", editingTask.status)
    formData.append("tags", data.tags || "")

    await updateTask(formData)
    setTasks(
      tasks.map((t) =>
        t._id === editingTask._id
          ? {
              ...t,
              title: data.title,
              description: data.description || "",
              dueDate: data.dueDate,
              tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
            }
          : t,
      ),
    )
    setEditingTask(null)
    router.refresh()
  }

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t._id === taskId)
    if (task) {
      const formData = new FormData()
      formData.append("id", task._id)
      formData.append("title", task.title)
      formData.append("description", task.description)
      formData.append("dueDate", task.dueDate)
      formData.append("status", newStatus)
      formData.append("tags", task.tags.join(","))

      await updateTask(formData)
      setTasks(tasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)))
      router.refresh()
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task._id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{task.title}</CardTitle>
              <Badge variant="secondary" className={statusColors[task.status]}>
                {task.status}
              </Badge>
            </div>
            <CardDescription className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Select onValueChange={(value) => handleStatusChange(task._id, value as TaskStatus)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-x-2">
              <Dialog
                onOpenChange={(open) => {
                  if (open) {
                    setEditingTask(task)
                    form.reset({
                      title: task.title,
                      description: task.description,
                      dueDate: task.dueDate,
                      tags: task.tags.join(", "),
                    })
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>Make changes to your task here.</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter tags, separated by commas" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(task._id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

