const form = document.getElementById("form");

var todos = loadTodos() ?? [];

if (todos) {
    for (const todo of todos) {
        renderTodoItem(document.querySelector(".todo-list"), todo);
    }
}

form.addEventListener("submit",
    e => {
        e.preventDefault();

        const input = document.getElementById('entry');
        const todoTitle = input.value;
        input.value = "";
        
        const todo = {
            id: generateId(),
            title: todoTitle, 
            checked: false
        };
    
        renderTodoItem(document.querySelector(".todo-list"),todo);
        todos.push(todo);
        saveTodos(todos);
    }
);


function generateId() {
    return Math.pow(10, 15 - 1) + Math.floor(Math.random() * 9 * Math.pow(10, 15 - 2));
}

function renderTodoItem(where, todo) {
    where.appendChild(constructTodoItem(todo));
}

function constructTodoItem(todo) {

    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checked";
    checkbox.id = todo.id;
    checkbox.value = todo.checked;
    checkbox.addEventListener("change", handleCheck);

    const title = document.createElement("p");
    title.classList.add("todo-title");
    title.innerHTML = todo.title;

    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = "delete";
    btn.classList.add("delete");
    btn.addEventListener("click", handleDelete);
    
    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(btn);

    return li;
}

function handleDelete(event) {

    event.preventDefault();

    const parent = event.target.parentElement;

    const id = parent.id;
    todos = todos.filter((todo) => todo.id != id);
    saveTodos(todos);

    parent.remove();
}

function handleCheck(event) {

    const checked = event.target.checked;
    const title = event.target.parentElement.querySelector(".todo-title");
    
    if (checked) {

        title.classList.add("strikethrough");

    } else {
        title.classList.remove("strikethrough");
    }    
}



function saveTodos(todos) {
    localStorage.setItem("poketch-todo-list",JSON.stringify(todos));
}

function loadTodos() {
    return JSON.parse(localStorage.getItem("poketch-todo-list"));
}