# Clients View

A modern React application for viewing and managing client data, integrated with Raynet CRM.

## 🚀 Technologies

### Core Stack

- [**React 19**](https://react.dev/) — UI library for building interfaces.
- [**Vite 7**](https://vite.dev/) — Extremely fast build tool and dev server.
- [**TypeScript**](https://www.typescriptlang.org/) — Type safety for reliable code.
- [**TanStack React Query**](https://tanstack.com/query/latest) — Asynchronous state management and caching.
- [**Axios**](https://axios-http.com/) — HTTP client for API requests.
- [**React Router 7**](https://reactrouter.com/) — Powerful routing for single-page applications.

### Forms & Validation

- [**React Final Form**](https://final-form.org/react) — Subscription-based form state management.
- [**Yup**](https://www.npmjs.com/package/yup) — Schema-based value parsing and validation.

### UI & Styling

- [**Tailwind CSS 4**](https://tailwindcss.com/) — Modern utility-first CSS framework.
- [**Radix UI**](https://www.radix-ui.com/) — Accessible, unstyled UI primitives (Select, Dialog).
- [**Lucide React**](https://lucide.dev/) — Beautiful and consistent icon set.
- [**Tailwind Variants**](https://www.tailwind-variants.org/) — Type-safe component variant management.

### Automation & Deployment

- **GitHub Actions** — Automatic deployment to GitHub Pages on every push to `main`.
- **ESLint** & **Prettier** — Code quality and consistent styling.
- **Husky** & **lint-staged** — Automatic pre-commit checks.

## 🏗️ Architecture

The project uses a **feature-based** architecture for better scalability:

```text
src/
├── core-ui/            # Reusable design system components
├── features/           # Feature-based modules (companies, routing, clients)
│   ├── companies/     # Company management logic and components
│   └── routing/       # Routing configuration
├── shared/             # Shared hooks, providers, and utilities
├── types/              # Global TypeScript types
└── main.tsx            # Entry point
```

## 🛠️ Installation and Setup

### 1. Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Build and Deploy

The project is configured for **automatic deployment** via GitHub Actions. Simply run `git push origin main`.

For manual builds:

```bash
npm run build
```

## ✨ Key Features

- **Company List** — Dynamic table with filtering and search.
- **Client Details** — Detailed information view for selected clients.
- **Modern UX** — Fast interface with smooth transitions and high accessibility.

## 📸 Demo

![Dashboard Overview](https://via.placeholder.com/800x450?text=Dashboard+Overview)
_Company table list with fulltext search capabilities._

![Client Details](https://via.placeholder.com/800x450?text=Client+Details)
_Detailed view of client information, including contact details and status._
