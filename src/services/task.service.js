const TaskModel = require('../models/task.model');


const CreateTask = async ({title, userid, description, dueDate}) => {
    try {
        if (!title) {
            return {
                status: 400,
                success: false,
                message: "Title is required"
            }
        }
        const task = new TaskModel({
            user_id: userid,
            title,
            description,
            due_date: dueDate
        });
        await task.save();
        return {
            status: 201,
            success: true,
            message: "Task created successfully",
            data: task
        }

    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while creating task" });
    }
}

const GetAllTasks = async (userid) => {
    try {
        const tasks = await TaskModel.find({ user_id: userid });
        return {
            status: 200,
            success: true,
            data: tasks,
            message: "Tasks retrieved successfully"
        }
    } catch (error) {
        res.status(500).send({ message: error.message|| "Error occurred while retrieving tasks" });
    }
}


const GetTask = async ({userid, todoId}) => {
    try {
        const task = await TaskModel.findOne({ _id: taskId, user_id: userid });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        return {
            status: 200,
            success: true,
            data: task,
            message: "Task retrieved successfully"
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while retrieving task" });
    }
}

const UpdateTask = async ({userid, todoId}) => {
    try {
        const task = await TaskModel.findOne({ _id: todoId , user_id: userid });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        task.title = req.body.title;
        task.description = req.body.description;
        task.due_date = req.body.due_date;
        await task.save();
        return {
            status: 200,
            success: true,
            data: task,
            message: "Task updated successfully"
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while updating task" });
    }
}

const DeleteTask = async ({userid, todoId}) => {
    try {
        const task = await TaskModel.findOne({ _id: todoId, user_id: userid });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        await task.remove();
        return {
            status: 200,
            success: true,
            message: "Task deleted successfully"
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const MarkTaskComplete = async ({ userid, todoId }) => {
    try {
        const task = await TaskModel.findOne({ _id: todoId, user_id: userid });
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }

        task.completed = true;
        task.updatedAt = new Date();
        await task.save();

        return {
            code: 200,
            success: true,
            data: task,
            message: "Task marked as completed"
        };
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred while marking task as completed" });
    }
};


module.exports = {
    CreateTask,
    GetAllTasks,
    GetTask,
    UpdateTask,
    DeleteTask,
    MarkTaskComplete
}