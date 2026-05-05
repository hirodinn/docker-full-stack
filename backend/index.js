import express from "express"
import cors from "cors"
import Goal from "./models/Goal.js"
import connectDB from "./scripts/database.js"
import mongoose from "mongoose"

const app = express()
app.use(cors())
app.use(express.json())

//const goals = [{ name: "hire bikila", id: "1" }, { name: "haile mola", id: "2" }, { name: "fita alemayehu", id: "3" }]

app.get("/goals", async (req, res) => {
    const goals = await Goal.find({})
    console.log(goals)
    res.send(goals)
})

app.post("/goals", async (req, res) => {
    try {

        const { message } = req.body

        const goal = new Goal({ message });

        await goal.save();

        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: "Failed to create goal" });
    }
});

app.delete("/goals/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = await Goal.deleteOne({ _id: id });

        // Check if anything was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Goal not found" });
        }

        res.json({ message: "Successfully deleted" });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete goal" });
    }
});

const startServer = async () => {
    await connectDB();
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`app running on ${PORT}`);
    });
};

startServer();