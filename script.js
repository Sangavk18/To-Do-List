const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// funtion to add task
const addTodo = () =>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must add new to do");
        return false;
    }

    if(addBtn.value === "Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }

    else{

        //creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);
        
        // creating edit button
        const editBtn =  document.createElement("button");
        editBtn.classList.add("btn", "editBtn");
        editBtn.innerHTML = "Edit";
        li.appendChild(editBtn); 

        // creating delete button
        const deleteBtn =  document.createElement("button");
        deleteBtn.innerHTML = "Remove";
        deleteBtn.classList.add("btn","deleteBtn");
        li.appendChild(deleteBtn); 


        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);

    }
}

//function to update like remove and edit task
const updateTodo = (e) => {
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    if(e.target.innerHTML == "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// function to save data to local storage
const saveLocalTodos = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

// function to get data to local storage
const getLocalTodos = () => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            
            //creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);
            
            // creating edit button
            const editBtn =  document.createElement("button");
            editBtn.classList.add("btn", "editBtn");
            editBtn.innerHTML = "Edit";
            li.appendChild(editBtn); 
            
            // creating delete button
            const deleteBtn =  document.createElement("button");
            deleteBtn.innerHTML = "Remove";
            deleteBtn.classList.add("btn","deleteBtn");
            li.appendChild(deleteBtn); 

            todoList.appendChild(li);

        });
    }
}

// function to delete data to local storage
const deleteLocalTodos = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todoIndex);
}

// function to edit data to local storage
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);