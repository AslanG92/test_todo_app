import { saveTodoIntoLocalStorage, getTodosFromLocalStorage, getDateRepresentation } from "./functions.js";

const addTodoInput = document.querySelector("[data-add-todo-input]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const todosContainer = document.querySelector("[data-todo-container]");
const todosTemplate = document.querySelector("[data-todos-templete]");
const serchTask = document.querySelector("[data-add-todo-search]");

let todoList = getTodosFromLocalStorage();
let filteredTdodList = [];

function renderfilteredTodos() {
    todosContainer.innerHTML = "";

    if (todoList.length === 0) {
        todosContainer.innerHTML = "<h3>TODOS NO FOUND!</h3>";
        return;
    }
    filteredTdodList.forEach((todo) => {
        const todoElement = createTodoLayout(todo);
        todosContainer.append(todoElement);
    });
}

function renderTodos() {
    todosContainer.innerHTML = "";

    if (todoList.length === 0) {
        todosContainer.innerHTML = "<h4>NO TASKS, please add some one if you need</h4>";
        return;
    }
    todoList.forEach((todo) => {
        const todoElement = createTodoLayout(todo);
        todosContainer.append(todoElement);
    });
}

function createTodoLayout(todo) {
    const todoElement = document.importNode(todosTemplate.content, true);

    const todoWrapper = todoElement.querySelector(".todos");
    if (todoWrapper) {
        todoWrapper.dataset.id = todo.id;
        if (todo.completed) {
            todoWrapper.classList.add("activeCh");
        }
    }

    const checkbox = todoElement.querySelector("[data-todo-checkbox]");
    checkbox.checked = todo.completed;

    const todoText = todoElement.querySelector("[data-todos-text]");
    todoText.textContent = todo.text;

    const todoCreatedDate = todoElement.querySelector("[data-todos-date]");
    todoCreatedDate.textContent = todo.createdAt;

    const removeTodoBtn = todoElement.querySelector("[data-remove-todos-btn]");
    removeTodoBtn.disabled = !todo.completed;

    checkbox.addEventListener("change", (e) => {
        todoList = todoList.map((todoElement) => {
            if (todoElement.id === todo.id) {
                todoElement.completed = e.target.checked;
            }

            return todoElement;
        });

        saveTodoIntoLocalStorage(todoList);

        if (serchTask.value.trim()) {
            filteredTdodList = todoList.filter((t) => {
                return t.text.includes(serchTask.value.trim());
            })
            renderfilteredTodos();
        } else {
            renderTodos();
        }
    });


    removeTodoBtn.addEventListener("click", () => {
        todoList = todoList.filter((todoElement) => {
            if (todoElement.id !== todo.id) {
                return todoElement;
            }
        });
        saveTodoIntoLocalStorage(todoList);

        if (serchTask.value.trim()) {
            filteredTdodList = todoList.filter((t) => {
                return t.text.includes(serchTask.value.trim());
            })
            renderfilteredTodos();
        } else {
            renderTodos();
        }
    });
    return todoElement;
}

renderTodos();

addTodoBtn.addEventListener("click", () => {
    if (addTodoInput.value.trim()) {
        const newTodo = {
            id: Date.now(),
            text: addTodoInput.value.trim(),
            completed: false,
            createdAt: getDateRepresentation(new Date()),
        }

        todoList.push(newTodo);
        addTodoInput.value = "";
        saveTodoIntoLocalStorage(todoList);
        renderTodos();
    }
});

serchTask.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim();
    filteredTdodList = todoList.filter((t) => {
        return t.text.includes(searchValue);
    })
    renderfilteredTodos();
});

addTodoInput.addEventListener("input", (e) => {
    if (serchTask.value.trim()) {
        serchTask.value = "";
        renderTodos();
    }
});



