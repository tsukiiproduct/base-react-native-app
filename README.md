# React Native + Express Starter (Windows / Android Emulator)

A minimal full-stack starter:

- **Mobile:** React Native (TypeScript) using the React Native CLI (no Expo).
- **Backend:** Node.js + Express in plain JavaScript.
- **Goal:** Run the app on the Android Studio emulator and have it call the local backend.

---

## Project structure

```
root/
  backend/                  Node.js + Express API (JavaScript)
    package.json
    server.js               Main server file (port 5000)
    .gitignore
  mobile/                   React Native TypeScript app
    App.tsx                 Main screen UI
    src/
      config/
        api.ts              API base URL (uses 10.0.2.2 for Android emulator)
    README_MOBILE_SETUP.md  Quick mobile-only setup notes
  README.md                 (this file)
```

> **Heads-up:** The `mobile/` folder ships with only the two customized
> source files (`App.tsx` and `src/config/api.ts`). The native Android
> project (Gradle wrapper, MainActivity.kt, `local.properties`, etc.) is
> created the standard way using the React Native CLI. See **Step 3** below.

---

## 1. Prerequisites

You need all of these installed and on your `PATH` before starting. All the
versions below are the safe, well-supported defaults at the time of writing.

| Tool | Recommended version | Notes |
| ---- | ------------------- | ----- |
| **Node.js** | 20 LTS or newer | Includes `npm`. Get it from <https://nodejs.org>. |
| **npm** | 10+ (ships with Node 20) | Verify with `npm -v`. |
| **Java JDK** | **JDK 17** (LTS) | Android Gradle Plugin 8.x requires JDK 17. Use Adoptium Temurin or the JDK bundled in Android Studio. |
| **Android Studio** | Latest stable (Hedgehog or newer) | Includes the SDK manager and emulator. |
| **Android SDK** | Platform 34 (Android 14) + Build-Tools 34.x | Install via Android Studio → SDK Manager. |
| **Android Emulator** | Latest | Create an AVD via Device Manager (e.g., Pixel 6, API 34). |
| **Git** (optional) | any | Useful but not required. |

### Required environment variables (Windows)

Set these in **System Properties → Environment Variables**:

- `JAVA_HOME` → e.g. `C:\Program Files\Java\jdk-17`
- `ANDROID_HOME` → e.g. `C:\Users\<you>\AppData\Local\Android\Sdk`

Add these to `Path`:

- `%JAVA_HOME%\bin`
- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\emulator`

After editing env vars, **open a new terminal** so they take effect. Verify:

```bat
node -v
npm -v
java -version
adb --version
```

`adb --version` proves `platform-tools` is on your `PATH`. If it isn't, the
`npm run android` step will fail with "adb not recognized".

---

## 2. Install dependencies

### 2a. Backend

```bat
cd backend
npm install
```

This installs `express`, `cors`, and the dev dependency `nodemon`.

### 2b. Mobile

The `mobile/` folder doesn't have its dependencies yet because the native
Android project hasn't been generated. Do that next.

---

## 3. One-time mobile project initialization

The React Native CLI generates the native Android scaffolding for you. Run
this **once** from the project root:

```bat
npx @react-native-community/cli@latest init MobileApp
```

When it finishes you'll have a `MobileApp\` folder. Now merge in the two
custom files from this repo's `mobile\` folder:

```bat
:: From the project root, in cmd.exe
copy /Y mobile\App.tsx MobileApp\App.tsx
mkdir MobileApp\src\config
copy /Y mobile\src\config\api.ts MobileApp\src\config\api.ts

:: Replace the placeholder mobile/ folder with the real project
rmdir /S /Q mobile
ren MobileApp mobile
```

> **PowerShell users:**
> ```powershell
> Copy-Item .\mobile\App.tsx .\MobileApp\App.tsx -Force
> New-Item -ItemType Directory -Force -Path .\MobileApp\src\config | Out-Null
> Copy-Item .\mobile\src\config\api.ts .\MobileApp\src\config\api.ts -Force
> Remove-Item -Recurse -Force .\mobile
> Rename-Item .\MobileApp .\mobile
> ```

That's it. From now on `mobile\` is a real, runnable React Native project
with our `App.tsx` and `src/config/api.ts` already in place.

---

## 4. Start the backend

Open a terminal:

```bat
cd backend
npm run dev
```

You should see:

```
Backend running on http://localhost:5000
Android emulator URL: http://10.0.2.2:5000
Available routes:
  GET /
  GET /api/health
  GET /api/message
```

Verify in a browser: <http://localhost:5000/api/message> — you should see
`{"message":"Hello from the backend!"}`.

Leave this terminal running.

---

## 5. Start the Android emulator

1. Open **Android Studio**.
2. Open **Device Manager** (the phone-with-android icon, or
   `View → Tool Windows → Device Manager`).
3. If you don't have an AVD yet, click **Create Device** → choose a phone
   (e.g. Pixel 6) → choose a system image (e.g. **API 34**, download if
   needed) → Finish.
4. Click the ▶️ play icon next to the AVD to start it. Wait until the
   home screen is fully visible.

Confirm the emulator is detected from a terminal:

```bat
adb devices
```

You should see something like:

```
List of devices attached
emulator-5554   device
```

---

## 6. Run the React Native app on Android

Open a **new** terminal (leave the backend one running):

```bat
cd mobile
npm install
npm run android
```

This does two things:

1. Starts the **Metro** JS bundler in a separate window.
2. Builds the Android app and installs it on the running emulator.

The first build can take **5–15 minutes** because Gradle downloads
dependencies. Subsequent builds are seconds.

When the app loads:

- You'll see "RN Starter" with a welcome message.
- Press **Call Backend**.
- You should see **"Hello from the backend!"** appear.

If you see an error instead, see **Troubleshooting** below.

---

## 7. How the mobile app talks to the backend

The mobile app calls `http://10.0.2.2:5000/api/message`.

- The Android emulator runs in its own virtual network. Inside the emulator,
  `localhost` / `127.0.0.1` refers to the **emulator itself**, not your PC.
- Android exposes the **host computer** at the special IP **`10.0.2.2`**.
- That's why `mobile/src/config/api.ts` uses `http://10.0.2.2:5000`.
- **The backend must already be running** before you press the button. If
  it isn't, the app will show "Could not reach backend".

For other targets, change the URL in `mobile/src/config/api.ts`:

| Target | URL |
| ------ | --- |
| Android emulator | `http://10.0.2.2:5000` |
| iOS simulator | `http://localhost:5000` |
| Real Android/iOS device on same Wi-Fi | `http://<your-PC-LAN-IP>:5000` |

---

## 8. Troubleshooting

### Metro bundler not starting

- Close any other Metro window first (only one can run on port 8081).
- Manually start it: `cd mobile && npx react-native start`.
- If it hangs, reset the cache: `npx react-native start --reset-cache`.

### Android emulator not detected (`adb devices` shows nothing)

- Make sure the emulator window is fully booted (home screen visible).
- Make sure `%ANDROID_HOME%\platform-tools` is on your `PATH`.
- Restart adb: `adb kill-server && adb start-server`.
- In Device Manager, "Cold Boot" the AVD if it's misbehaving.

### Backend connection failed (mobile shows error after pressing the button)

- Confirm the backend is running: open <http://localhost:5000/api/message>
  in your PC's browser.
- Confirm the URL in `mobile/src/config/api.ts` is `http://10.0.2.2:5000`.
- Double-check you're on the **emulator**, not a real device. On a real
  device you must use your PC's LAN IP, not `10.0.2.2`.
- Restart the app: in the Metro window, press `R` twice (or shake gesture).

### Port 5000 already in use

Find what's using it and kill it, or change the port:

```bat
:: Find the PID using port 5000
netstat -ano | findstr :5000
:: Then kill it (replace 12345 with the actual PID)
taskkill /PID 12345 /F
```

Or run on another port:

```bat
set PORT=5050 && npm run dev
```

If you change the port, also update `mobile/src/config/api.ts`.

### Gradle build taking too long

- The first build downloads ~1 GB of Gradle/Android dependencies. Be patient.
- Don't kill it — it usually finishes after 5–15 minutes on the first run.
- Make sure your antivirus isn't scanning every file in `~/.gradle/`.

### "SDK location not found"

In `mobile/android/local.properties`, add (or fix) this line — use forward
slashes or escaped backslashes:

```
sdk.dir=C\:\\Users\\<you>\\AppData\\Local\\Android\\Sdk
```

Or set `ANDROID_HOME` (see Prerequisites) and re-run.

### "adb not recognized as an internal or external command"

`%ANDROID_HOME%\platform-tools` isn't on your `PATH`. Add it (see
Prerequisites), then **open a new terminal**.

### Firewall blocking backend requests

Windows Defender Firewall sometimes prompts the first time Node listens on
a port. Allow it for **Private** networks. If you've blocked it by mistake:
**Control Panel → Windows Defender Firewall → Allow an app** → find Node.js
→ check Private.

### App installs but immediately closes / red error screen

- Make sure Metro is running (a separate terminal window should be open).
- Reload the app (press `R` twice in the emulator, or `Ctrl+M` to open the
  dev menu and pick "Reload").

---

## 9. Useful commands

| Action | Command |
| ------ | ------- |
| Install backend deps | `cd backend && npm install` |
| Start backend (with auto-reload) | `cd backend && npm run dev` |
| Start backend (production) | `cd backend && npm start` |
| Install mobile deps | `cd mobile && npm install` |
| Start Metro | `cd mobile && npx react-native start` |
| Reset Metro cache | `cd mobile && npx react-native start --reset-cache` |
| Run on Android | `cd mobile && npm run android` |
| List connected devices | `adb devices` |
| Restart adb | `adb kill-server && adb start-server` |

---

## 10. What each major file/folder does

```
backend/
  package.json        Backend deps (express, cors) + scripts (start, dev).
  server.js           Express app. Defines /, /api/health, /api/message.
                      Listens on port 5000 (override with PORT env var).
  .gitignore          Ignores node_modules and friends.

mobile/
  App.tsx             The single-screen UI. Functional component using
                      useState for loading/error/message state. Styles
                      live in a StyleSheet at the bottom of the file.
  src/config/api.ts   Single source of truth for the API base URL.
                      Uses http://10.0.2.2:5000 because the Android
                      emulator can't reach the host via "localhost".
  android/            (Generated by RN CLI) Native Android project.
  ios/                (Generated by RN CLI; macOS only.)
  package.json        (Generated by RN CLI) RN deps + npm run android, etc.
  tsconfig.json       (Generated by RN CLI) TypeScript settings.
  metro.config.js     (Generated by RN CLI) Metro bundler config.
  babel.config.js     (Generated by RN CLI) Babel transform config.
  index.js            (Generated by RN CLI) Entry point — registers App.

README.md             This file.
```

---

## Quick-start TL;DR

```bat
:: 1. Install backend deps and start it
cd backend
npm install
npm run dev

:: 2. (One-time) Generate the React Native native project and merge our files in.
::    See Section 3 above for the exact steps.

:: 3. In a new terminal: install mobile deps and run on Android
cd mobile
npm install
npm run android
```

Press **Call Backend** in the app. You should see
**"Hello from the backend!"** appear. That's the round-trip working.
