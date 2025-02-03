# TaskFlow

TaskFlow is a modern, full-stack task management application built with Next.js, MongoDB, and Shadcn UI components. It provides a clean and intuitive interface for managing tasks, with features like task creation, updating, deletion, and status tracking.

## Features

- Create, read, update, and delete tasks
- Mark tasks with different statuses (Not Started, In Progress, Completed, On Hold, Cancelled)
- Add tags to tasks for better organization
- Dashboard with task metrics and recent tasks overview
- Responsive design with a collapsible sidebar
- MongoDB integration for data persistence
- Server-side rendering and API routes with Next.js
- Modern UI components from Shadcn UI
- Form validation with React Hook Form and Zod

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building server-side rendered and statically generated applications
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing task data
- [Shadcn UI](https://ui.shadcn.com/) - A collection of reusable UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/) - Forms with easy-to-use validation
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account (for database)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/amanjaiswal7236/taskflow.git
cd taskflow
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit:

```
http://localhost:3000
```