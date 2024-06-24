require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT || 5000, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world');
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
