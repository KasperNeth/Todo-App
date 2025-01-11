const TaskService = require('../services/task.service')


const CreateTask = async (req, res) => {
  
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
      req.flash('error', 'Title and Due Date are required');
      return res.status(400).redirect("/dashboard");
    }

    const response = await TaskService.CreateTask({
      userid: req.user._id, 
      title,
      description,
      dueDate,
    });

    if (response.success) {
      req.flash("success", response.message);
      return res.status(response.code).redirect("/dashboard");
    } else {
      req.flash('error', response.message || "Failed to create task");
      return res.status(response.code).redirect("/dashboard");
    }
  
};




const GetAllTasks = async (req, res) => {
    // console.log('req.user:', req.user); 
    const response = await TaskService.GetAllTasks(req.user._id); 
    if (response.success) {
      req.flash("success", response.message);
      return res.status(response.code).redirect("/dashboard");
    } else {
      req.flash('error', response.message || 'Failed to fetch tasks');
      return res.status(500).render('error', { message: response.message });
    }
  
};


const GetTask = async (req, res) => {
  
      const response = await TaskService.GetTask({
          userid: req.user._id,
          todoId: req.params.taskId
      });

      if (response.success) {
          return res.status(200).render("task", {
              task: response.data,
              message: response.message
          });
      } else if (response.code === 404){
        res.flash('error', response.message);
      }else {
        res.flash('error', response.message || "Failed to retrieve task");
      }
  
};



const DeleteTask = async (req, res) => {
  const { action } = req.params; 
  
      const response = await TaskService.DeleteTask({
          userid: req.user._id,
          todoId: req.params.taskId,
          action,
      });
      if (response.success) {
        req.flash('success', response.message);
        res.status(response.code).redirect("/dashboard");
      } else {
        req.flash('error', response.message);
        res.status(response.code).redirect("/dashboard");
      }
  
};


const UpdateTask = async (req, res) => {
  
      const response = await TaskService.UpdateTask({
          userid: req.user._id,
          todoId: req.params.taskId
      });

      if (response.success) {
          req.flash("success", response.message);
      } else {
          req.flash("error", response.message || "Failed to mark task as completed");
      }

      // Redirect to the dashboard
      return res.status(response.code).redirect("/dashboard");
 
};





module.exports = {
  CreateTask,
  GetAllTasks,
  GetTask,
  UpdateTask,
  DeleteTask,
}