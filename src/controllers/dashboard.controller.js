const TaskModel = require('../models/task.model');
const TaskService = require("../services/task.service")


const dashBoardController = async (req, res) => {
  try {
   
    if (!req.user || !req.user._id) {
      console.error("User ID is missing");
      return res.status(400).render("error", { message: "User ID is missing. Please log in again." });
  }
  const successMessages = req.flash('success');
  console.log('User from session:', req.user); 

    const completedTask = await TaskModel.countDocuments({
      user_id: req.user._id,
      state: 'completed',
    });

    const pendingTask = await TaskModel.countDocuments({
      user_id: req.user._id,
      state: 'pending',
    });

    const TotalTasks = completedTask + pendingTask;
    const completedPercent = TotalTasks > 0 ? Math.round((completedTask / TotalTasks) * 100) : 0;

    const response = await TaskService.GetAllTasks(req.user._id); 
    const tasks = response.success ? response.data : [];

    res.render('dashboard', {
      user: req.user,
      tasks,
      completedPercent,
      message: successMessages.length > 0 ? successMessages[0] : null,
    });
  } catch (err) {
    console.error(`Error in dashboardController: ${err.message}`);
    res.status(500).render('dashboard', {
      user: req.user || {},
      tasks: [],
      completedPercent: 0,
      message: 'Error fetching tasks',
    });
  }
};


module.exports = { dashBoardController };



