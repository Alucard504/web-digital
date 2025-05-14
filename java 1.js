const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? 'checked' : ''} />
        <span class="${task.completed ? 'line-through text-gray-500' : ''}">
          ${task.name} - ${task.deadline}
        </span>
      </label>
      <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const name = taskInput.value.trim();
  const deadline = deadlineInput.value;
  if (!name) return;

  tasks.push({ name, deadline, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = '';
  deadlineInput.value = '';
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();