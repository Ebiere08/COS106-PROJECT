
let tasks = [];
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const plannerTableBody = document.getElementById("plannerTableBody");
const validationMessage = document.getElementById("validationMessage");
addTaskBtn.addEventListener("click", handleAddTask);
function handleAddTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        validationMessage.style.display = "block";
        return; 
    }
    validationMessage.style.display = "none";
    const newTask = {
        id: Date.now(),      
        name: taskText,
        completed: false    
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}
function renderTasks() {
    plannerTableBody.innerHTML = "";
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        const textStyle = task.completed ? "text-decoration: line-through; color: #64748b;" : "";
        row.innerHTML = `
            <td style="${textStyle}">${index + 1}. ${task.name}</td>
            <td>
                <button class="status-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "🔄 Undo" : "✅ Complete"}
                </button>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteTask(${task.id})">❌ Delete</button>
            </td>
        `;
        plannerTableBody.appendChild(row);
    });
}
function toggleTask(taskId) {
    
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

