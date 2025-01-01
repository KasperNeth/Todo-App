const TaskService = require('../services/task.service')


const CreateTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
      req.flash('error', 'Title and Due Date are required');
      return res.redirect("/dashboard");
    }

    const response = await TaskService.CreateTask({
      userid: req.user._id, 
      title,
      description,
      dueDate,
    });

    if (response.success) {
      req.flash("message", "Task created successfully");
      return res.redirect("/dashboard");
    } else {
      req.flash('error', response.message || "Failed to create task");
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.error('Error creating task:', error.message);
    req.flash('error', 'An unexpected error occurred');
    return res.redirect("/dashboard");
  }
};




const GetAllTasks = async (req, res) => {
  try {
    console.log('req.user:', req.user); 
    const response = await TaskService.GetAllTasks(req.user._id); 
    if (response.success) {
      return res.status(200).json(response.data); 
    } else {
      req.flash('error', response.message || 'Failed to fetch tasks');
      return res.status(500).render('error', { message: response.message });
    }
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    return res.status(500).render('error', { message: 'Unexpected error occurred' });
  }
};


const GetTask = async (req, res) => {
  try {
      const response = await TaskService.GetTask({
          userid: req.user._id,
          todoId: req.params.taskId
      });

      if (response.success) {
          return res.status(200).render("task", {
              task: response.data,
              message: response.message
          });
      } else {
          return res.status(404).render("error", { message: response.message || "Task not found" });
      }
  } catch (error) {
      console.error('Error retrieving task:', error.message);
      return res.status(500).render("error", { message: "Unexpected error occurred while retrieving task" });
  }
};



const DeleteTask = async (req, res) => {
  try {
      const response = await TaskService.DeleteTask({
          userid: req.user._id,
          todoId: req.params.taskId 
      });

      if (response.success) {
          req.flash("message", response.message);
      } else {
          req.flash("error", response.message || "Failed to delete task");
      }
      return res.redirect("/dashboard");
  } catch (error) {
      console.error('Error deleting task:', error.message);
      req.flash("error", "Unexpected error occurred while deleting task");
      return res.redirect("/dashboard");
  }
};


const UpdateTask = async (req, res) => {
  try {
      const response = await TaskService.UpdateTask({
          userid: req.user._id,
          todoId: req.params.taskId
      });

      if (response.success) {
          req.flash("message", response.message);
      } else {
          req.flash("error", response.message || "Failed to mark task as completed");
      }

      // Redirect to the dashboard after marking as completed
      return res.redirect("/dashboard");
  } catch (error) {
      console.error('Error marking task complete:', error.message);
      req.flash("error", "Unexpected error occurred while marking task as complete");
      return res.redirect("/dashboard");
  }
};





module.exports = {
  CreateTask,
  GetAllTasks,
  GetTask,
  UpdateTask,
  DeleteTask,
}