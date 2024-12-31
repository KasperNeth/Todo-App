
    document.addEventListener("DOMContentLoaded", () => {
        const alertBox = document.getElementById("view-alert");
        if (alertBox) {
            setTimeout(() => {
                alertBox.classList.add("hidden"); 
                setTimeout(() => {
                    alertBox.style.display = "none"; 
                }, 500); 
            }, 3000);
        }
    });

    const createTaskBtn = document.getElementById('create-task-btn');
const taskFormPopup = document.getElementById('task-form-popup');
const overlay = document.querySelector('.overlay');

// Show the task form popup
createTaskBtn.addEventListener('click', () => {
    taskFormPopup.style.display = 'block';
    overlay.style.display = 'block';
});

// Hide the popup when clicking on the overlay
overlay.addEventListener('click', () => {
    taskFormPopup.style.display = 'none';
    overlay.style.display = 'none';
});

