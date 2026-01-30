const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let events = []; // Store events in-memory

// Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// Create a new event
app.post('/events', (req, res) => {
  const event = { id: Date.now(), ...req.body };
  events.push(event);
  res.json(event);
});

// Register attendee
app.post('/register', (req, res) => {
  const { eventId, name, phone } = req.body;
  const event = events.find(e => e.id == eventId);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  event.attendees = event.attendees || [];
  event.attendees.push({ name, phone, code: Date.now() });
  res.json({ success: true });
});

app.listen(port, () => console.log(`API server running at http://localhost:${port}`));
