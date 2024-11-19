let todoList = []
const ul = document.getElementById("todoList");

function fetchList() {
  
  removeListChild()
  
  if (todoList.length < 1) {
    const li = document.createElement("li");
    
    ul.classList.replace("p-0", "pe-3");
    ul.style.listStyle = "none";
  
    li.classList.add("fw-medium", "fs-5");
    li.textContent = "No Task";

    ul.appendChild(li);
    document.getElementById('data-length').innerText  = 0
    return;
  }

  todoList.forEach((item, index) => {
    const li = document.createElement("li")

    appendChildList(li, item, index)

    ul.appendChild(li)
  })
  
  const pendingTasks = todoList.filter(data => !data.done).length

  document.getElementById('data-length').innerText = pendingTasks

  if (todoList.length > 0 && pendingTasks === 0) alert("All tasks are done, good job!");
}

function addTask() {
  const el = document.getElementById('input-todo')
  const task = el.value

  if (!task) return alert('fill the task')

  const newTask = { task, done: false }

  if (todoList.length === 0) removeListChild()

  todoList.push(newTask)

  el.value = ''

  fetchList()
}

function deleteAllTask() {
  todoList = []
  removeListChild()

  fetchList()
}

function finishAllTask() {
  if (todoList.length < 1) return alert('no todo list')

  todoList = todoList.map((data) => {
    return {...data, done: true}
  })

  const allDone = todoList.every((task) => task.done);
  
  fetchList()

  if (allDone) {
    alert("All tasks are done, good job!");
  }
}

function appendChildList(li, item, index) {

  if (!li || !item || index < 0) return alert('please provide element, item and index')
  
  ul.classList.add("p-0");

  li.classList.add("w-100", "d-flex", "align-items-center", "px-3", "py-1", "m-0");
  
  if (ul.children.length === 0) {
    li.classList.add("border");
  } else {
    li.classList.add("border", "border-top-0");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.done;

  checkbox.addEventListener("change", () => {
    todoList[index].done = checkbox.checked;
    fetchList();
  });

  const checkboxLabel = document.createElement("label");
  checkboxLabel.textContent = "Selesai";
  checkboxLabel.style.paddingLeft = "5px";
  checkboxLabel.style.flex = "1";

  checkboxLabel.htmlFor = `checkbox-${index}`;
  checkbox.id = `checkbox-${index}`;

  const taskText = document.createElement("span");
  taskText.textContent = item.task;
  taskText.style.flex = "1";

  if (item.done) {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "gray";
  }

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("btn", "btn-sm", "btn-danger");

  removeButton.addEventListener("click", () => {
    todoList.splice(index, 1);
    fetchList();
  });

  li.appendChild(taskText);

  li.appendChild(checkbox);
  li.appendChild(checkboxLabel);

  li.appendChild(removeButton);
}

function removeListChild() {
  ul.innerHTML = ''
}

fetchList()