const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

connectDB();

const animalRoutes = require('./routes/animals');
const healthRecordRoutes = require('./routes/healthRecords');
const appointmentRoutes = require('./routes/appointments');
const vetRoutes = require('./routes/vets');
const ownerRoutes = require('./routes/owners');

app.use('/api/animals', animalRoutes);
app.use('/api/healthrecords', healthRecordRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/owners', ownerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});