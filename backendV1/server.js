require('dotenv').config()
const express = require('express');
const cors = require('cors');

const connectDB = require('./database/db')
const postRoutes = require('./routes/postRoutes')

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})