# Project Manager (Trello-like Board)

A modern, flexible, and high-performance task manager featuring a Kanban-board style interface. Built with Next.js (App Router) and Prisma ORM. Through a strict separation of server and client logic, the application ensures maximum data security, instant page loads, and a smooth user experience.

---

## Tech Stack

The application is built using modern web development tools:

* **Framework:** Next.js (App Router, Server Actions, Async params).
* **Database & ORM:** Prisma ORM (relational data modeling via Prisma Client).
* **Authentication:** Auth.js / NextAuth (secure route protection, session management based on userId).
* **Styling:** Tailwind CSS (responsive design, group-hover effects, custom modals).
* **Language:** TypeScript (strict typing for props, model interfaces, and Prisma Enums for task statuses).

---

## Core Features

The project implements full CRUD (Create, Read, Update, Delete) functionality across three hierarchical levels:

### 1. Project Management
* Create new projects with a title and an optional description.
* Display projects in a grid layout, sorted by creation date, including current status indicators.
* Edit and delete projects directly from the main dashboard.
* Data privacy: users can only view and manage projects associated with their specific authenticated userId.

### 2. Stages (Columns)
* Dynamically add new columns within a specific project.
* Automatic calculation of stage order positioning via server-side methods (e.g., `prisma.stage.count()`).
* Quick rename and delete capabilities for each stage.

### 3. Tasks
* Create task cards within specific columns.
* Strict lifecycle management using Prisma Enums (TODO, IN_PROGRESS, DONE).
* Edit forms integrated with a select dropdown to easily update the current task status.
* Optimized user interface: action buttons (edit/delete) are hidden by default and transition smoothly into view only when hovering over a specific task card.

---

## Architecture & Design Patterns

The main advantage of this project is its high level of code abstraction and adherence to Next.js best practices:

* **Server Components:** Page components fetch data directly on the server (`prisma.findUnique`, `prisma.findMany`). This prevents sensitive data leaks to the client and provides fast Server-Side Rendering (SSR).
* **Universal Action Components:** Custom abstracted client components (`<CreateButton />`, `<EditButton />`, `<DeleteButton />`) accept Server Actions, hidden inputs, and styling as props. This eliminates state duplication for modal windows across the app.
* **Universal Forms:** Form components are highly reusable and configure dynamically based on the entity being processed (Project, Stage, or Task).
* **Hidden Inputs:** Relational data (such as `projectId`, `stageId`, `taskId`) is securely passed from the client back to the server via `FormData`, avoiding the need for complex global state management or redundant API routes.
* **Event Management:** Strategic use of absolute positioning (`z-index`) and event handlers (`e.preventDefault()`) resolves UI click conflicts, allowing interactive buttons to sit safely inside routing components like `Next/Link`.

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/IvanGozhyi/project_manager)
   cd project-manager

###
Install dependencies:`npm install`


###
Configure environment variables:
####
Create a .env file in the root directory and add your database connection and authentication secrets:


`DATABASE_URL="your-database-connection-string"`

`AUTH_SECRET="your-nextauth-secret"`

###
Run Prisma migrations:
`npx prisma db push`

###
Start the development server:
`npm run dev`
###
Open http://localhost:3000 in your browser to view the application.