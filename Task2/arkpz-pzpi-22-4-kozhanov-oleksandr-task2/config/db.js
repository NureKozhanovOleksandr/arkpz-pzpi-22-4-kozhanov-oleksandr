const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/animal_care_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected'))
.catch((err) => console.log('Error to connect MongoDB:', err));
