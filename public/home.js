document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const tasksList = document.getElementById("tasks");

    function addTask() {
        const taskText = input.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <span class="edit-btn">Edit</span>
                <span class="delete-btn">Delete</span>
            `;
            tasksList.appendChild(li);
            input.value = "";
        }
    }

    function removeTask(event) {
        if (event.target.classList.contains("delete-btn")) {
            const taskToRemove = event.target.parentElement;
            tasksList.removeChild(taskToRemove);
        }
    }

    function editTask(event) {
        if (event.target.classList.contains("edit-btn")) {
            const taskToEdit = event.target.parentElement;
            const taskTextElement = taskToEdit.querySelector("span");
            const newTaskText = prompt("Edit task:", taskTextElement.textContent);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                taskTextElement.textContent = newTaskText;
            }
        }
    }

    addBtn.addEventListener("click", addTask);
    tasksList.addEventListener("click", removeTask);
    tasksList.addEventListener("click", editTask);
});
