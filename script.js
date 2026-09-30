const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});