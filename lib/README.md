# Dashboard Architecture

## API Layer (`lib/api/`)

- **Default**: Uses `/api/dashboard` (MongoDB-backed Next.js API routes) when `NEXT_PUBLIC_API_URL` is not set.
- **Override**: Set `NEXT_PUBLIC_API_URL` to an external backend base URL if needed.
- **Single import**: `import { getLeads, getCustomers, ... } from "@/lib/api"`

## Context (`lib/context/`)

- Global state for dashboard (auth, user, etc.)
- Wrap dashboard routes with `DashboardProvider`

## Types (`lib/types/`)

- Shared types for Lead, Customer, Project, etc.
- Align with backend models when API is built
