
export function saveTodoIntoLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}


export function getDateRepresentation(todoCreatedDate) {
    return Intl.DateTimeFormat("en-EN", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(todoCreatedDate);
}