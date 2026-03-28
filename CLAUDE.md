# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured yet.

## Architecture

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Axios

**API:** Backend runs at `http://localhost:8080` (configured via `NEXT_PUBLIC_API_URL` in `.env.local`).

### Layer Structure

```
src/
├── types/       # TypeScript interfaces (e.g., Service)
├── services/    # Axios API call functions (one file per resource)
├── lib/         # Axios instance config (baseURL, headers)
├── hooks/       # Custom hooks — business logic, state, CRUD orchestration
├── components/  # Reusable UI components
└── app/         # Next.js App Router pages and root layout
```

### STRICT RULE: Page vs Hook separation

**NEVER put logic in `page.tsx`.** This is a hard rule, no exceptions.

- `src/app/<resource>/page.tsx` — JSX only. Calls the hook, renders the result. No `useState`, no `useEffect`, no API calls, no event handler logic.
- `src/hooks/use<Resource>.ts` — everything else: state, effects, API calls, derived values, event handlers.

If you find yourself writing `useState` or `async` inside a `page.tsx`, stop and move it to the hook.

### Key Patterns

- **State management:** Local React state via custom hooks — no Redux/Zustand. Each resource gets a custom hook (e.g., `useServices`) that owns state and calls service functions.
- **API layer:** `src/lib/axios.ts` exports a pre-configured Axios instance. `src/services/` files import it and export typed async functions per HTTP operation. Each function receives a typed object with the exact fields needed, sends it directly, and returns `res.data` typed as the resource. Example pattern:
  ```ts
  export const createTurn = async (turn: {
    appointmentDate: string
    customerName: string
    serviceId: string
  }) => {
    const res = await api.post("/turn", turn)
    return res.data as Turn
  }
  ```
  Every CRUD operation (GET, POST, PUT, DELETE) follows this same shape — one function per operation, typed inline params, no extra logic.
- **Client components:** Pages that use hooks are marked `"use client"`. The root layout (`src/app/layout.tsx`) is a server component wrapping a persistent sidebar + main content area.
- **Path alias:** `@/*` maps to `src/*`.

### Implemented Features

- `/service` — full CRUD for barber services (the main implemented feature)
- `/`, `/profile`, `/turn` — placeholder pages

### Code Style

- **No underscore prefixes** on variables, constants, or any identifiers (e.g. use `servicesCache`, not `_servicesCache`).

### Adding a New Resource

1. Add type to `src/types/<resource>.ts`
2. Add API functions to `src/services/<resource>.ts` using the axios instance from `src/lib/axios.ts`
3. Create `src/hooks/use<Resource>.ts` for state + CRUD logic
4. Build the page at `src/app/<resource>/page.tsx` with `"use client"`
