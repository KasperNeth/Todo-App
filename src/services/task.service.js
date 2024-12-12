const TaskModel = require('../models/task.model');


const CreateTask = async (req, res) => {
    try {
        const task = new TaskModel({
            user_id: req.user._id,
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const GetAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({ user_id: req.user._id });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


const GetTask = async (req, res) => {
    try {
        const task = await TaskModel.findOne({ _id: req.params.id, user_id: req.user._id });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const UpdateTask = async (req, res) => {
    try {
        const task = await TaskModel.findOne({ _id: req.params.id, user_id: req.user._id });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        task.title = req.body.title;
        task.description = req.body.description;
        task.due_date = req.body.due_date;
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const DeleteTask = async (req, res) => {
    try {
        const task = await TaskModel.findOne({ _id: req.params.id, user_id: req.user._id });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        await task.remove();
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


module.exports = {
    CreateTask,
    GetAllTasks,
    GetTask,
    UpdateTask,
    DeleteTask
}