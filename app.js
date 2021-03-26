const taskInput = document.querySelector(".add-block__input");
const addButton = document.querySelector(".add-block__btn");
const incompleteTaskHolder = document.querySelector(".todo-block__container");
const completedTasksHolder = document.querySelector(".complete-block__container");

const createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");

    listItem.className = "task-form";

    label.innerText = taskString;
    label.className = "task-form__label task";

    checkBox.type = "checkbox";   
    checkBox.className = "task-form__checkbox";

    editInput.type = "text";
    editInput.className = "task-form__text";

    editButton.innerText = "Edit"; 
    editButton.className = "task-form__btn_edit";

    deleteButton.innerText = "Delete";
    deleteButton.className = "task-form__btn_delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "task-form__image";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = function () {
    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

const editTask = function () {
    let listItem = this.parentNode;

    let editInput = listItem.querySelector(".task-form__text");
    let label = listItem.querySelector(".task-form__label");
    let editBtn = listItem.querySelector(".task-form__btn_edit");
    let containsClass = listItem.classList.contains("task-form_edit");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task-form_edit"); 
};

const deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    ul.removeChild(listItem);
}

const taskCompleted = function () {
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector(".task-form__checkbox");
    let editButton = taskListItem.querySelector(".task-form__btn_edit");
    let deleteButton = taskListItem.querySelector(".task-form__btn_delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

addButton.addEventListener("click", addTask);