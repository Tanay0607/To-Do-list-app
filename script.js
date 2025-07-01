let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.querySelector(".textinput");
const todocount = document.querySelector(".todocount");
const addbtn = document.querySelector(".addbtn");
const deletebtn = document.querySelector(".deletebtn");
const todoele = document.querySelector(".todoele");


document.addEventListener("DOMContentLoaded", function(){
    addbtn.addEventListener("click", addTask);
    todoInput.addEventListener("keydown" , function(event){
        if(event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deletebtn.addEventListener("click", deleteTask);
    displayTask();
});

function addTask(){
    const newTask = todoInput.value.trim();
    if(newTask !== ""){
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTask();
    }
}

function deleteTask(){
    todo = [];
    saveToLocalStorage();
    displayTask();
}

function displayTask() {
    todoele.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todocontainer">
                <input type="checkbox" class="todocheckbox" id="input-${index}" ${
                    item.disabled ? "checked" : ""
                }>

                <p id="todo-${index}" class="${
                    item.disabled ? "disabled" : ""
                }" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
        p.querySelector(".todocheckbox").addEventListener("change", () =>
        toggleTask(index)
        );
        todoele.appendChild(p);
    });
    todocount.textContent = todo.length
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingele = todo[index].text;
    const inputele = document.createElement("input");

    inputele.value = existingele;
    todoItem.replaceWith(inputele);
    inputele.focus();

    inputele.addEventListener("blur", function() {
        const updatedText = inputele.value.trim();
        if(updatedText){
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTask();
    })
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTask();
}


function saveToLocalStorage() {
    localStorage.setItem("todo" , JSON.stringify(todo));
}