const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// Connect to MongoDB Database
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

const app = express();
const PORT = process.env.PORT || 3000;

require('./routes/authRoutes')(app);

// Initiate Server 
app.listen(PORT);
