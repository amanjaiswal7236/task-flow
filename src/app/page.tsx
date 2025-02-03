import { Suspense } from "react"
import { getTasks } from "./action"
import TaskMetrics from "./components/TaskMetrics"
import RecentTasks from "./components/RecentTasks"
import QuickActions from "./components/QuickActions"

export default async function DashboardPage() {
  const tasks = await getTasks()

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <Suspense fallback={<div>Loading metrics...</div>}>
        <TaskMetrics tasks={tasks} />
      </Suspense>

      <Suspense fallback={<div>Loading recent tasks...</div>}>
        <RecentTasks tasks={tasks} />
      </Suspense>

      <QuickActions />
    </div>
  )
}