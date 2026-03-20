# Clients View

A modern React application for viewing and managing client data, integrated with Raynet CRM.

## 📸 Demo

![Dashboard Placeholder](https://via.placeholder.com/800x450?text=Dashboard+View)
![Client Details Placeholder](https://via.placeholder.com/800x450?text=Client+Details+View)

## 🚀 Technologies

### Core Stack

- **React 19** - UI library with the latest features.
- **Vite** - Extremely fast build tool and dev server.
- **TypeScript** - For type safety and better developer experience.
- **TanStack React Query** - Powerful asynchronous state management.
- **Axios** - Promise-based HTTP client for API requests.

### UI & Styling

- **Tailwind CSS 4** - Modern utility-first CSS framework.
- **Tailwind Variants** - Type-safe component variant management.
- **Radix UI** - Unstyled, accessible UI primitives (e.g., Select).
- **Lucide React** - Beautiful and consistent icon library.

### Development Tools

- **ESLint** & **Prettier** - For code quality and consistent formatting.
- **Husky** & **lint-staged** - Automated pre-commit quality checks.

## 🏗️ Architecture

The project follows a **feature-based architecture** combined with a robust component system:

```text
src/
├── core-ui/            # Reusable design system components
├── features/           # Feature-based modules (e.g., companies, routing)
│   ├── companies/     # Company management logic and components
│   └── routing/       # Application routing configuration
├── shared/             # Shared hooks, providers, and utilities
├── types/              # Global TypeScript types
└── main.tsx            # Application entry point
```

## 🛠️ Installation and Setup

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (package manager)

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and add your Raynet CRM credentials:

```env
VITE_RAYNET_API_KEY=your_api_key_here
VITE_RAYNET_USER=your_email@example.com
VITE_RAYNET_INSTANCE=your_instance_id
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## ✨ Key Features

- **Company List** - Dynamic table view of companies with filtering and search.
- **Client Details** - Comprehensive information view for selected clients.
- **Raynet CRM Integration** - Seamless data synchronization with Raynet API.
- **Modern UI** - Responsive and accessible interface with a premium feel.

## 🧹 Linting and Formatting

```bash
# Check and fix code quality issues
npm run lint

# Format code with Prettier
# (Note: Requires a format script in package.json, or use npx prettier --write .)
```

---
