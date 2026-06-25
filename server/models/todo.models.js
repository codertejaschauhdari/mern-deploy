const { mongoose } = require("mongoose");

//schema
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
},
{    timestamps :true}
)

//modal
const todo = mongoose.model("user", todoSchema)

module.exports = todo;