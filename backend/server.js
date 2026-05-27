// Simple Express backend used by the React Native starter app.
// Runs on port 5000 by default. Override with the PORT env var if needed.

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow cross-origin requests so the mobile app (and a browser) can call the API.
app.use(cors());
app.use(express.json());

// Root route — quick sanity check from a browser.
app.get('/', (req, res) => {
  res.send('Backend is running. Try /api/health or /api/message.');
});

// Health check route — used by tooling / smoke tests.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Main message route — this is what the mobile app calls when the user
// presses the "Call Backend" button.
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log('---------------------------------------------');
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Android emulator URL: http://10.0.2.2:${PORT}`);
  console.log('Available routes:');
  console.log('  GET /');
  console.log('  GET /api/health');
  console.log('  GET /api/message');
  console.log('---------------------------------------------');
});
