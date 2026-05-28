# React Native + Express Starter

A clean, navigable React Native starter with TypeScript, React Navigation, light/dark mode, and a minimal Express backend.

- **Mobile:** React Native CLI (no Expo) + TypeScript + React Navigation v7
- **Styling:** StyleSheet with a typed theme system (auto light/dark via `useColorScheme`)
- **Backend:** Node.js + Express, one example route
- **Target:** Android Studio emulator on Windows

---

## Project structure

```
root/
  backend/
    server.js                  Express app (one route)
    package.json
    .gitignore
  mobile/
    App.tsx                    Providers + RootNavigator
    index.js                   Entry (imports gesture-handler first)
    package.json
    src/
      config/api.ts            API_BASE_URL (10.0.2.2 for Android emulator)
      theme/                   colors, spacing, typography, radii, useTheme()
      context/AuthContext.tsx  Auth flag toggled by Login screen (no real auth)
      hooks/useAuth.ts
      navigation/
        types.ts               Route param types
        RootNavigator.tsx      Splash -> Auth | Main
        AuthStack.tsx          Welcome / Login / Register / ForgotPassword
        MainTabs.tsx           Home / Search / Notifications / Profile
        HomeStack.tsx          HomeMain -> Details
        ProfileStack.tsx       ProfileMain -> Settings
      screens/                 11 screens (placeholder content)
      components/              Button, Input, Card, Header, SearchBar, Modal,
                               Loading, EmptyState, Divider, Toast, Screen
  README.md
```

---

## Navigation flow

```
SplashScreen (auto-dismisses ~0.8s)
   |
   v
AuthStack (when not signed in)
   Welcome  -> Login | Register
   Login    -> ForgotPassword
   Login/Register -> calls signIn(), then RootNavigator re-renders MainTabs
   |
   v
MainTabs (when signed in)
   HomeTab (HomeStack)
     HomeMain -> Details (params: { id, title })
   Search          (filterable list)
   Notifications   (static list)
   ProfileTab (ProfileStack)
     ProfileMain -> Settings
     Profile has a "Log out" button -> signOut() -> back to AuthStack
```

Back navigation works via native-stack's built-in header back button and Android hardware back.

---

## Prerequisites

- Node.js 22+
- Android Studio + an AVD (Pixel 6 / API 34 recommended)
- JDK 17, `ANDROID_HOME` configured (see the prerequisites section below if you don't have these)

---

## Install dependencies

### Backend

```bat
cd backend
npm install
```

### Mobile

The mobile `package.json` has been updated with the React Navigation dependencies. Install everything in one go:

```bat
cd mobile
npm install
```

This installs:

| Package | Why |
| ------- | --- |
| `@react-navigation/native` | Navigation core |
| `@react-navigation/native-stack` | Native stack navigator (used for Auth, Home, Profile sub-stacks) |
| `@react-navigation/bottom-tabs` | Bottom tab bar |
| `react-native-screens` | Native screen container, dramatically reduces JS memory pressure |
| `react-native-gesture-handler` | Required for stack swipe gestures + tab gestures |
| `react-native-safe-area-context` | Safe-area insets on devices with notches |

`react-native-gesture-handler` is imported at the very top of `mobile/index.js` — that's required by the package.

---

## Run

Open two terminals.

**Terminal 1 — backend:**
```bat
cd backend
npm run dev
```

**Terminal 2 — mobile (with the Android emulator already running):**
```bat
cd mobile
npm run android
```

The first build may take 5-15 minutes because Gradle downloads dependencies.

---

## What to expect on the emulator

1. **Splash** screen with spinner, ~0.8s
2. **Welcome** screen with "Log in" and "Create account" buttons
3. **Login** screen — any email/password works; tap "Log in" to be signed in
4. **Main tabs:**
   - **Home** — sample cards. Tap one to push the **Details** screen. Also has a "Ping /api/message" button that hits the backend.
   - **Search** — type to filter a list of fruits. Shows EmptyState when no matches.
   - **Inbox** — a static notifications card.
   - **Profile** — avatar, name, "Log out" (opens a Modal confirmation).
     - Tap "Settings" to push the Settings screen with two toggles.

Swipe back from the left edge, use the header back arrow, or use the Android hardware back button to navigate back.

Light/dark theme follows the system setting. Toggle from the emulator: Settings -> Display -> Dark theme.

---

## Backend

Single file (`backend/server.js`) with one route group:

- `GET /` — sanity message
- `GET /api/health` — `{ status: 'ok', uptime }`
- `GET /api/message` — `{ message: 'Hello from the backend!' }` (used by Home's ping button)

Listens on `5000`. The Android emulator reaches it at `http://10.0.2.2:5000`.

---

## Common issues

- **"Unable to resolve module '@react-navigation/native'"** — you forgot `npm install` in `mobile/`. Run it then `npm run android` again.
- **Gestures don't work on Android** — verify `import 'react-native-gesture-handler';` is the very first line of `mobile/index.js`. If you reset Metro cache, run `npx react-native start --reset-cache`.
- **"No space left on device" when installing the APK** — emulator's internal storage is full. In Android Studio Device Manager, wipe data on the AVD or increase its internal storage to 8 GB.
- **Backend ping fails on Home screen** — backend not running, or URL in `mobile/src/config/api.ts` isn't `http://10.0.2.2:5000`. On a real device use your PC's LAN IP, not `10.0.2.2`.
- **"adb not recognized"** — add `%ANDROID_HOME%\platform-tools` to your `PATH` and open a new terminal.

---

## Extending

- **Add a screen:** create `src/screens/MyScreen.tsx`, add it to a stack in `src/navigation/`, add the route name to the matching `*ParamList` in `src/navigation/types.ts`.
- **Add a real backend call:** see Home's `pingBackend` for the pattern. For more structure, add a `src/services/` folder with one file per resource.
- **Add styling with NativeWind:** install `nativewind` + `tailwindcss`, edit `babel.config.js` to add `'nativewind/babel'`, edit `metro.config.js` to wrap with `withNativeWind`, create `tailwind.config.js` and `global.css`. Then components can use `className=` instead of inline styles. The existing theme tokens can be ported to `tailwind.config.js`'s `theme.extend`.
- **Add real auth:** swap the placeholder in `src/context/AuthContext.tsx` for a real login call. Persist the token with `@react-native-async-storage/async-storage`.
