import mongoose from "mongoose";

const goalModel = new mongoose.Schema({
    message: String
})

const Goal = mongoose.model("Goal", goalModel)

export default Goal;