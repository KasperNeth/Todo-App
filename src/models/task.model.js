const mongoose = require('mongoose');
const shortid = require('shortid');



const TaskSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate
    },
    user_id: {
        type: String,
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
        required: true,
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
