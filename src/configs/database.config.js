const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/InveendaDB");
        console.log("Conectado a MongoDB...");

    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectDB;
