const taskInput = document.querySelector(".add-block__input");//Add a new task.
const addButton = document.querySelector(".add-block__button");//first button
const incompleteTaskHolder = document.querySelector(".todo-block__container");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".complete-block__container");//completed-tasks

const createNewTaskElement = function (taskString) {

    var listItem = document.createElement("form");

    //input (checkbox)
    var checkBox = document.createElement("input");//checkbx
    //label
    var label = document.createElement("label");//label
    //input (text)
    var editInput = document.createElement("input");//text
    //button.edit
    var editButton = document.createElement("button");//edit button

    //button.delete
    var deleteButton = document.createElement("button");//delete button
    var deleteButtonImg = document.createElement("img");//delete button image

    label.innerText = taskString;
    label.className = 'task';

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "btn-edit";

    deleteButton.innerText = "Delete";
    deleteButton.className = "btn-delete";
		deleteButtonImg.src = './remove.svg';
		deleteButtonImg.className = "btn-delete__image";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector('.form__text');
    var label = listItem.querySelector(".form__label");
    var editBtn = listItem.querySelector(".btn-edit");
    var containsClass = listItem.classList.contains("form__edit");
    //If class of the parent is .editmode
    if (containsClass) {
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("form__none");
};

const deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

const taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelectorAll(".form__checkbox");
    var editButton = taskListItem.querySelector(".btn-edit");
    var deleteButton = taskListItem.querySelector(".btn-delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

addButton.addEventListener("click", addTask);