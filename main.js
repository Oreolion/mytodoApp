
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoButton = document.querySelector("#add-todo");
const input = document.querySelector("#todo-input");
const nameInput = document.querySelector(".nameinput");
const todoList = document.querySelector("#listOfTodos");
input.focus()
let todo;

const username = localStorage.getItem("username") || "";

nameInput.value = username

nameInput.addEventListener("change", (e)=> {
    localStorage.setItem("username", e.target.value)
})

todoButton.addEventListener("click", (e) => {
  e.preventDefault();
   todo = {
    todoItem: input.value,
    done: false,
    createdAt: new Date().getTime(),
    addColon: (todoItem) => {
        return todo.todoItem = `${todo.todoItem}!!!`
    }
};

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";


  if (!todo.todoItem) return;
  updateDisplay();
});

updateDisplay();


function updateDisplay() {
  todoList.innerHTML = "";
  todo.addColon()


  todos.forEach(todo => {
    const eachTodoBox = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const checkDoneBtn = document.createElement("input");
    eachTodoBox.innerHTML = `<textarea rows="3" cols="10" class="input" readonly>${todo.todoItem}`;
    // window.onresize = () => {

    //     if (window.innerWidth == "500px") {
    //         eachTodoBox.innerHTML = `<input type="text" class="input" readonly>${todo.todoItem}`;
    //         updateDisplay()
    //     }

    // }
    
    
    
    deleteBtn.textContent = "Delete";
    // deleteBtn.innerHTML = "<i class='fa-solid fa-trash-2xs'> Delete</i> "
    editBtn.textContent = "Edit";

    deleteBtn.className = "delete__todo";
    editBtn.className = "edit__todo";
    eachTodoBox.className = "each__todo";
    checkDoneBtn.type = "checkbox";

    checkDoneBtn.className = "checkbtn";
    

    todoList.append(eachTodoBox);
    eachTodoBox.prepend(checkDoneBtn);
    eachTodoBox.append(editBtn);
    eachTodoBox.append(deleteBtn);

    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t !== todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      updateDisplay();
    });

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = eachTodoBox.querySelector(".input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.todoItem = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        updateDisplay();
      });
    });

    checkDoneBtn.addEventListener("click", (e) => {
      todo.done = checkDoneBtn.checked
      eachTodoBox.querySelector(".input").classList.toggle("done");
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log(todo.done);
    });
  });
}
