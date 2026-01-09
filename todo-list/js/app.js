const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updatePendingCount() {
    const pending = tasks.filter(task => !task.completed).length;
    pendingCount.textContent = pending;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.classList.add("complete");
        completeBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.addEventListener("click", () => {
            const confirmDelete = confirm("¿Deseas eliminar esta tarea?");
            if (confirmDelete) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });

    updatePendingCount();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = input.value.trim();
    if (taskText === "") {
        alert("La tarea no puede estar vacía");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
});

renderTasks();
