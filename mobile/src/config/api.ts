// API configuration for the mobile app.
//
// IMPORTANT: The Android emulator cannot reach the host computer using
// "localhost" or "127.0.0.1" — those refer to the emulator itself, not your PC.
// Android exposes the host machine at the special IP address 10.0.2.2.
// So when the backend is running on your computer at port 5000, the emulator
// must call http://10.0.2.2:5000 to reach it.
//
// If you ever need to run somewhere else, change this URL accordingly:
//   - iOS simulator:   http://localhost:5000
//   - Real device:     http://<your-computer-LAN-IP>:5000  (phone + PC on same Wi-Fi)

export const API_BASE_URL = 'http://10.0.2.2:5000';
