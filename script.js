// 1. Find the elements on the page
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// 2. Load saved tasks (or start with an empty list)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. Save the tasks array into localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4. Draw all tasks on the screen
function renderTasks() {
  taskList.innerHTML = ""; // clear the list first

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// 5. Add a new task
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please type a task first!");
    return;
  }

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// 6. Events
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 7. Show saved tasks when the page first loads
renderTasks();