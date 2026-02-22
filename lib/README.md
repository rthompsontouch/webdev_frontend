# Dashboard Architecture

## API Layer (`lib/api/`)

- **Mock-first**: When `NEXT_PUBLIC_API_URL` is not set, all API calls return mock data.
- **Backend-ready**: Set `NEXT_PUBLIC_API_URL` to your backend base URL when ready. No frontend refactor needed.
- **Single import**: `import { getLeads, getCustomers, ... } from "@/lib/api"`

## Context (`lib/context/`)

- Global state for dashboard (auth, user, etc.)
- Wrap dashboard routes with `DashboardProvider`

## Types (`lib/types/`)

- Shared types for Lead, Customer, Project, etc.
- Align with backend models when API is built
