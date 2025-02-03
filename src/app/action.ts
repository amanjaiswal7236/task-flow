"use server"

import clientPromise from "./lib/mongodb"
import { ObjectId } from "mongodb"

export type TaskStatus = "Not Started" | "In Progress" | "Completed" | "On Hold" | "Cancelled"

export type Task = {
  _id: string
  title: string
  description: string
  dueDate: string
  status: TaskStatus
  tags: string[]
}

export async function getTasks(): Promise<Task[]> {
  const client = await clientPromise
  const collection = client.db("taskflow").collection("tasks")
  const tasks = await collection.find({}).toArray()
  return tasks.map((task) => ({
    _id: task._id.toString(),
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
    tags: task.tags,
  }))
}

export async function addTask(formData: FormData): Promise<void> {
  const client = await clientPromise
  const collection = client.db("taskflow").collection("tasks")

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const dueDate = formData.get("dueDate") as string
  const status = formData.get("status") as TaskStatus
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  await collection.insertOne({
    title,
    description,
    dueDate,
    status,
    tags,
  })
}

export async function updateTask(formData: FormData): Promise<void> {
  const client = await clientPromise
  const collection = client.db("taskflow").collection("tasks")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const dueDate = formData.get("dueDate") as string
  const status = formData.get("status") as TaskStatus
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        description,
        dueDate,
        status,
        tags,
      },
    },
  )
}

export async function deleteTask(formData: FormData): Promise<void> {
  const client = await clientPromise
  const collection = client.db("taskflow").collection("tasks")

  const id = formData.get("id") as string

  await collection.deleteOne({ _id: new ObjectId(id) })
}