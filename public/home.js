const token = localStorage.getItem('token');

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const tasksList = document.getElementById("tasks");

    function addTask() {
        const taskText = input.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.id = Date.now().toString();
            li.innerHTML = `
                <span>${taskText}</span>
                <span class="edit-btn">Edit</span>
                <span class="delete-btn">Delete</span>
            `;
            tasksList.appendChild(li);
            addTaskToDb(taskText, li.id);
            input.value = "";
        }
    }

    function addTaskToDb(content, id){
        const listInfo = {
            id: id,
            description: content
          };
          fetch('http://localhost:5000/createTodo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(listInfo)
          }).then(response => response.json())
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error('Error : ', error);
              alert(error)
            });
    }

    function deleteListfromDB(id){
        const listItemInfo = {
            id: id,
          };
          fetch('http://localhost:5000/delete/' + id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(listItemInfo)
          }).then(response => response.json())
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error('Error : ', error);
              alert(error)
            });
    }

    function addTaskToDb(content, id){
        const listInfo = {
            id: id,
            description: content
          };
          fetch('http://localhost:5000/createTodo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(listInfo)
          }).then(response => response.json())
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error('Error : ', error);
              alert(error)
            });
    }

    function updateTaskDB(id, description){
        const listItemInfo = {
            description: description
          };
          fetch('http://localhost:5000/update/' + id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(listItemInfo)
          }).then(response => response.json())
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error('Error : ', error);
              alert(error)
            });
    }

    function removeTask(event) {
        if (event.target.classList.contains("delete-btn")) {
            const taskToRemove = event.target.parentElement;
            deleteListfromDB(taskToRemove.id);
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
                updateTaskDB(taskToEdit.id, newTaskText);
            }
        }
    }

    addBtn.addEventListener("click", addTask);
    tasksList.addEventListener("click", removeTask);
    tasksList.addEventListener("click", editTask);
});
