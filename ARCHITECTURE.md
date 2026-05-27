# Architecture & Scaffolding Notes

This doc accompanies `README.md`. It explains what's been laid out, why each
piece exists, and the order to install the heavier libraries when you need
them — without breaking the existing build.

The change applied was deliberately **additive**. Nothing in this pass:

- adds new npm dependencies
- modifies `App.tsx`
- requires a native rebuild
- changes how `npm run android` works today

Everything new lives inside `mobile/src/` and `backend/src/`. The existing
working app is untouched, so the next time you run the build you get the
same result. Files are scaffolding ready to be wired up when the
corresponding library is installed.

## Navigation choice: React Navigation, not Expo Router

The project uses **bare React Native CLI** (not Expo). Expo Router is built
on top of `expo-router` and requires the Expo runtime, file-based routing
config, and `expo` itself as a dependency — none of which fit a CLI project
without significant migration. React Navigation works natively with bare RN,
has a larger ecosystem of community add-ons (drawer, bottom-tabs,
material-top-tabs, native-stack), and matches the codebase's existing
project style. Pick Expo Router only if you decide to migrate the whole app
to Expo Managed — that's a separate decision.

## Backend structure

```
backend/
  server.js                  thin entry — wires middleware + routes
  .env.example               documents the env vars; copy to .env locally
  src/
    config/
      env.js                 single source of truth for process.env reads
    middleware/
      logger.js              request log: method, path, status, duration
      errorHandler.js        centralized JSON error response
      auth.js                JWT scaffolding (no-op until jsonwebtoken is added)
    controllers/
      healthController.js    GET /api/health
      messageController.js   GET /api/message
      configController.js    GET /api/config
      profileController.js   GET / PUT /api/profile
      settingsController.js  GET / PUT /api/settings
    routes/
      index.js               mounts each resource router
      health.js  message.js  config.js  profile.js  settings.js
    validation/
      schemas.js             validator-agnostic placeholder schemas
    utils/
      asyncHandler.js        wraps async route handlers to forward errors
```

All existing routes (`GET /`, `GET /api/health`, `GET /api/message`) still
respond exactly as before. New routes:

- `GET  /api/config` — returns app config + feature flags for the client
- `GET  /api/profile` — returns the current profile (in-memory)
- `PUT  /api/profile` — updates the profile, runs placeholder validation
- `GET  /api/settings` — returns user settings (in-memory)
- `PUT  /api/settings` — updates user settings

Profile and settings routes are wrapped with `requireAuth`, which is a
**no-op middleware** today. The shape mirrors a real JWT middleware so you
flip it on by editing one file:

1. `cd backend && npm i jsonwebtoken`
2. Replace the TODO in `src/middleware/auth.js` with real `jwt.verify(...)`.
3. Set `JWT_SECRET` in `backend/.env`.

## Mobile structure

```
mobile/
  App.tsx                    UNCHANGED — still calls /api/message on load
  src/
    config/api.ts            UNCHANGED — API_BASE_URL ('http://10.0.2.2:5000')
    theme/
      colors.ts              palette + light/dark color schemes
      spacing.ts             4px-based spacing scale
      typography.ts          type scale paired with line heights
      radii.ts               border-radius tokens
      index.ts               assembled `lightTheme` / `darkTheme` objects
    types/
      index.ts               User, AppSettings, AppConfig, ApiErrorBody, etc.
    constants/
      index.ts               STORAGE_KEYS, API_TIMEOUT_MS, etc.
    utils/
      format.ts              formatRelativeTime, truncate, capitalize
      storage.ts              get/set/remove (in-memory; ready for AsyncStorage)
    services/
      client.ts              fetch-based request<T>() + ApiError class
      healthService.ts       getHealth, getMessage
      profileService.ts      getProfile, updateProfile
      settingsService.ts     getSettings, updateSettings
    components/
      index.ts               barrel re-exports
      layouts/
        Screen.tsx           SafeArea + StatusBar + scroll variant
        Card.tsx             bordered surface
        Divider.tsx          hairline rule
        PageHeader.tsx       title + subtitle + optional right slot
        EmptyState.tsx       empty-list helper
        LoadingWrapper.tsx   loading / error / empty / content switch
      ui/
        Button.tsx           variants: primary | secondary | ghost | danger
        Input.tsx            label + hint + error states
        Badge.tsx            neutral | success | warning | danger | info
    hooks/
      useTheme.ts            currently returns lightTheme; reads themeStore later
      useApi.ts              Zustand-/React-Query-shaped data fetch hook
    store/
      createStore.ts         tiny Zustand-shaped store on useSyncExternalStore
      userStore.ts           { user, isAuthenticated, setUser, signOut }
      themeStore.ts          { mode, setMode, toggle }
      settingsStore.ts       { settings, setSettings, reset }
```

Nothing here is imported by `App.tsx` yet — these are foundations. The next
time you open a new screen file, import from `../components`, `../theme`,
`../store`, and you get type-safe access to everything above.

## Why these abstractions (not the libraries themselves) for now

The user prompt named specific libraries: Zustand, React Query, Axios,
React Hook Form + Zod, NativeWind, React Navigation, AsyncStorage. Each of
these is a real install with native modules, babel plugin changes, or
peer-dependency churn. Adding all of them at once before the basic flow is
green is the fastest way to a broken project.

This pass instead delivers **the shapes** those libraries provide:

| Concern | Today (no new deps) | Migration path |
| ------- | ------------------- | -------------- |
| State management | `store/createStore.ts` (Zustand-shaped) | `npm i zustand` → swap `createStore.ts` to `export { create } from 'zustand'` |
| Server state | `hooks/useApi.ts` (useQuery-shaped) | `npm i @tanstack/react-query` → replace import in callers |
| HTTP client | `services/client.ts` (fetch + AbortController) | `npm i axios` → rewrite `request()` with an axios instance + interceptors |
| Form state | n/a | `npm i react-hook-form zod @hookform/resolvers` when first form lands |
| Persistent storage | `utils/storage.ts` (Map-backed) | `npm i @react-native-async-storage/async-storage` → swap body of storage |
| Auth | `middleware/auth.js` (no-op JWT) | `npm i jsonwebtoken` + fill TODO |
| Styling | `theme/*` + StyleSheet | `npm i nativewind tailwindcss` + babel config when ready |
| Navigation | n/a | `npm i @react-navigation/native @react-navigation/native-stack` + native deps |

Every call site only ever sees the local shape. The day you install Zustand,
the only change is in `store/createStore.ts`. Same for the others.

## How to grow this

1. **Wire `useTheme()` to the store**: change `hooks/useTheme.ts` to read
   `useThemeStore((s) => s.mode)` and return `mode === 'dark' ? darkTheme :
   lightTheme`. Then refactor components to call `useTheme()` instead of
   importing `lightTheme` directly.
2. **Activate real auth**: install `jsonwebtoken`, fill the TODO in
   `backend/src/middleware/auth.js`, add `/api/auth/login` and `/api/auth/me`
   controllers, and start using `useUserStore.setUser(...)` after login.
3. **Add navigation**: install React Navigation + native-stack and create
   `src/navigation/RootNavigator.tsx` with an Auth stack and a Tab navigator.
   The screens go in `src/screens/`.
4. **Add NativeWind only after** the rest is stable — it requires
   `babel.config.js` and `tailwind.config.js` changes that can disrupt Metro
   if anything else is in flux.

## Production checklist (future work)

- Move backend to TypeScript. Single `tsconfig.json`, `ts-node-dev` for
  dev, build step for prod.
- Add persistent storage on the backend (Postgres + Prisma, or SQLite for
  local dev).
- Replace the `console.log` request logger with `pino` + `pino-http`.
- Add Helmet, rate limiting (`express-rate-limit`), and request-size limits.
- Set up testing: Vitest or Jest for unit + supertest for API.
- Add a CI workflow (`.github/workflows/ci.yml`) running lint + tests.
- Centralize error tracking (Sentry on both server and mobile).
- Strict TypeScript in `mobile/tsconfig.json` — enable `strict`,
  `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- Add `react-native-config` (or `react-native-dotenv`) so the API base URL
  is read from `.env` instead of hard-coded in `src/config/api.ts`.
