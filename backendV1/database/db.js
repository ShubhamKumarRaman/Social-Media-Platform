// MongoDB Connection
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Database Connected Successfully")
    } catch (err) {
        console.error(err);
        console.error("Database Connection failed");
        process.exit(1);
    }
}

module.exports = connectDB;