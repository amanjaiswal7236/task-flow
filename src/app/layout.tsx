"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard, CheckSquare, PanelLeftClose, PanelLeft } from "lucide-react"
import { useState } from "react"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <html lang="en">
      <title>Todo-Flow</title>
      <body className={cn(inter.className, "bg-gray-50")}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside
            className={cn(
              "bg-white border-r transition-all duration-300 flex flex-col",
              isSidebarOpen ? "w-64" : "w-16",
            )}
          >
            <div className={cn("flex items-center justify-between border-b", isSidebarOpen ? "p-4" : "p-2")}>
              {isSidebarOpen ? <h1 className="text-xl font-bold">TaskFlow</h1> : null}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn("ml-auto", !isSidebarOpen && "ml-0")}
              >
                {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
              </Button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <Button
                    asChild
                    variant="ghost"
                    className={cn("w-full justify-start", !isSidebarOpen && "justify-center p-2")}
                  >
                    <Link href="/">
                      <LayoutDashboard className="h-4 w-4" />
                      {isSidebarOpen && <span className="ml-2">Dashboard</span>}
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    asChild
                    variant="ghost"
                    className={cn("w-full justify-start", !isSidebarOpen && "justify-center p-2")}
                  >
                    <Link href="/tasks">
                      <CheckSquare className="h-4 w-4" />
                      {isSidebarOpen && <span className="ml-2">Tasks</span>}
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}