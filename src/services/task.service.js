const TaskModel = require('../models/task.model');
const CreateTask = async ({ title, userid, description, dueDate }) => {
    try {
      if (!title || !userid || !dueDate) {
        return {
          status: 400,
          success: false,
          message: 'Title, User ID, and Due Date are required',
        };
      }
  
      const task = new TaskModel({
        user_id: userid, 
        title,
        description,
        due_date: dueDate,
      });
  
      await task.save();
  
      return {
        status: 201,
        success: true,
        message: 'Task created successfully',
        data: task,
      };
    } catch (error) {
      console.error('Error in CreateTask service:', error.message);
      return {
        success: false,
        code: 500,
        data: null,
        message: error.message || 'Error occurred while creating task',
      };
    }
  };
  



  const GetAllTasks = async (userid, state = null) => {
    try {
        let query = { user_id: userid };
        if (state) query.state = state; 

        const tasks = await TaskModel.find(query);
        return {
            status: 200,
            success: true,
            data: tasks,
            message: state ? `Tasks with state '${state}' retrieved successfully` : "All tasks retrieved successfully",
        };
    } catch (error) {
        console.error("Error in GetAllTasks service:", error.message);
        return {
            success: false,
            code: 500,
            data: null,
            message: error.message || "Error occurred while retrieving tasks",
        };
    }
};


  


const GetTask = async ({ userid, todoId }) => {
    try {
        const task = await TaskModel.findOne({ _id: todoId, user_id: userid });

        if (!task) {
            return { status: 404, success: false, message: "Task not found" };
        }

        return { status: 200, success: true, data: task, message: "Task retrieved successfully" };
    } catch (error) {
        return { status: 500, success: false, message: error.message || "Error occurred while retrieving task" };
    }
};




const DeleteTask = async ({ userid, todoId, action }) => {
    try {
        let updateData;

        if (action === "delete") {
            const task = await TaskModel.findOne({ _id: todoId, user_id: userid });
            if (!task) {
                return { status: 404, success: false, message: "Task not found" };
            }

            updateData = {
                state: 'deleted',
                previousState: task.state, 
                updatedAt: new Date(),
            };
        } else if (action === "restore") {
            const task = await TaskModel.findOne({ _id: todoId, user_id: userid, state: 'deleted' });
            if (!task) {
                return { status: 404, success: false, message: "Task not found or not in deleted state" };
            }

            updateData = {
                state: task.previousState || 'pending',
                previousState: null, 
                updatedAt: new Date(),
            };
        } else if (action === "permanentlyDelete") {
            const task = await TaskModel.findOneAndDelete({ _id: todoId, user_id: userid, state: 'deleted' });
            if (!task) {
                return { status: 404, success: false, message: "Task not found or not eligible for permanent deletion" };
            }
            return { status: 200, success: true, message: "Task permanently deleted" };
        } else {
            return { status: 400, success: false, message: "Invalid action" };
        }

        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: todoId, user_id: userid },
            updateData,
            { new: true }
        );

        if (!updatedTask) {
            return { status: 404, success: false, message: "Task not found" };
        }

        return { status: 200, success: true, message: `Task successfully ${action === "delete" ? "moved to deleted" : "restored"}` };
    } catch (error) {
        return { status: 500, success: false, message: error.message || "Error occurred while processing task action" };
    }
};



const UpdateTask = async ({ userid, todoId }) => {
    try {
        const task = await TaskModel.findOneAndUpdate(
            { _id: todoId, user_id: userid }, 
            { state: 'completed', updatedAt: new Date() },
            { new: true } 
        );

        if (!task) {
            return { status: 404, success: false, message: "Task not found" };
        }

        return {
            status: 200,
            success: true,
            data: task,
            message: "Task marked as completed"
        };
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: error.message || "Error occurred while marking task as completed"
        };
    }
};



module.exports = {
    CreateTask,
    GetAllTasks,
    GetTask,
    UpdateTask,
    DeleteTask,
    
}