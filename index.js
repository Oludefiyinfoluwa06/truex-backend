require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const taskRoutes = require('./routes/tasks');
const settingRoutes = require('./routes/setting');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI_PROD;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world'));
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/setting', settingRoutes);