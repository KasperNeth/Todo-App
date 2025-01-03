const TaskService = require("../services/task.service");

const dashBoardController = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).render("error", { message: "User ID is missing. Please log in again." });
        }

        const completedTasks = await TaskService.GetAllTasks(req.user._id, 'completed');
        const pendingTasks = await TaskService.GetAllTasks(req.user._id, 'pending');
        const deletedTasks = await TaskService.GetAllTasks(req.user._id, 'deleted');

        const totalTasks = (completedTasks.data?.length || 0) + (pendingTasks.data?.length || 0);
        const completedPercent = totalTasks > 0 ? Math.round((completedTasks.data?.length / totalTasks) * 100) : 0;

        const successMessages = req.flash('success');
        const errorMessages = req.flash('error');

        const errorMessage = errorMessages.length > 0 ? errorMessages[0] : null;
        const message = successMessages.length > 0 ? successMessages[0] : null;

        res.render('dashboard', {
            user: req.user,
            completedTasks: completedTasks.data || [],
            pendingTasks: pendingTasks.data || [],
            deletedTasks: deletedTasks.data || [],
            completedPercent,
            message,
            errorMessage
        });
    } catch (error) {
        console.error("Error in dashboardController:", error.message);
        res.status(500).render('dashboard', {
            user: req.user || {},
            completedTasks: [],
            pendingTasks: [],
            deletedTasks: [],
            completedPercent: 0,
            errorMessage: "Error fetching tasks",
        });
    }
};


module.exports = { dashBoardController };