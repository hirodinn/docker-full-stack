import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect("mongodb://mongodb:27017");
        console.log("Database Connected");
    } catch (err) {
        console.log("Failed Database Connection");
    }
}