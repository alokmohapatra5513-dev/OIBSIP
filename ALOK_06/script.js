const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

const taskTemplate = document.getElementById("taskTemplate");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}

function updateCounters() {
  const pending = tasks.filter((task) => !task.completed).length;

  const completed = tasks.filter((task) => task.completed).length;

  pendingCount.textContent = pending;

  completedCount.textContent = completed;

  pendingEmpty.style.display = pending === 0 ? "block" : "none";

  completedEmpty.style.display = completed === 0 ? "block" : "none";
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please enter a task.");

    return;
  }

  tasks.unshift({
    id: Date.now(),

    text: text,

    completed: false,

    addedTime: new Date(),

    completedTime: null,
  });

  taskInput.value = "";

  saveTasks();

  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function renderTasks() {
  pendingList.innerHTML = "";

  completedList.innerHTML = "";

  tasks.forEach((task) => {
    const clone = taskTemplate.content.cloneNode(true);

    const item = clone.querySelector(".task-item");

    const text = clone.querySelector(".task-text");

    const added = clone.querySelector(".added-time");

    const completed = clone.querySelector(".completed-time");

    const completedWrapper = clone.querySelector(".completed-time-wrapper");

    const completeBtn = clone.querySelector(".complete-btn");

    const editBtn = clone.querySelector(".edit-btn");

    const deleteBtn = clone.querySelector(".delete-btn");

    text.textContent = task.text;

    added.textContent = formatDate(task.addedTime);
    if (task.completed) {
      item.classList.add("completed-task");

      completed.textContent = formatDate(task.completedTime);

      completedWrapper.style.display = "block";
    }

    completeBtn.addEventListener("click", function () {
      task.completed = true;

      task.completedTime = new Date();

      saveTasks();

      renderTasks();
    });

    editBtn.addEventListener("click", function () {
      if (task.completed) {
        alert("Completed tasks cannot be edited.");

        return;
      }

      const newText = prompt("Edit your task:", task.text);

      if (newText === null) return;

      if (newText.trim() === "") {
        alert("Task cannot be empty.");

        return;
      }

      task.text = newText.trim();

      saveTasks();

      renderTasks();
    });

    deleteBtn.addEventListener("click", function () {
      const confirmDelete = confirm(
        "Are you sure you want to delete this task?",
      );

      if (!confirmDelete) return;

      tasks = tasks.filter(function (t) {
        return t.id !== task.id;
      });

      saveTasks();

      renderTasks();
    });

    if (task.completed) {
      completedList.appendChild(clone);
    } else {
      pendingList.appendChild(clone);
    }
  });

  updateCounters();
}

renderTasks();

window.addEventListener("load", function () {
  taskInput.focus();
});

taskInput.addEventListener("blur", function () {
  taskInput.value = taskInput.value.trim();
});
