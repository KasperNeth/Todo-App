const mongoose = require('mongoose');



const TaskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        enum: ["pending", "complete", "deleted"],
        default: 'pending'
    },
    due_date: {
        type: Date,
        required: true
    },
    
},{timestamps: true})

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;
