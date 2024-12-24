const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');

const app = express();
app.use(express.json());

const Animal = require('./Models/Animal');
const Owner = require('./Models/Owner');
const HealthRecord = require('./Models/HealthRecord');
const Vet = require('./Models/Vet');
const Appointment = require('./Models/Appointment');

// Import routes
const animalRoutes = require('./routes/animals');

// Use routes
app.use('/api/animals', animalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});