
let tomeets = JSON.parse(localStorage.getItem("tomeets")) || [];
const todoButton = document.querySelector("#add-todo");
const input = document.querySelector("#todo-input");
const nameInput = document.querySelector(".nameinput");
const todoList = document.querySelector("#listOfTodos");
// window.focus()
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
        return todo.todoItem = `${todo.todoItem}!!`
    }
};

  tomeets.push(todo);
  localStorage.setItem("tomeets", JSON.stringify(tomeets));
  input.value = "";


  if (!todo.todoItem) return;
  updateDisplay();
});

updateDisplay();


function updateDisplay() {
  todoList.innerHTML = "";
  todo.addColon()


  tomeets.forEach(todo => {
    const eachTodoBox = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const checkDoneBtn = document.createElement("input");
    eachTodoBox.innerHTML = `<textarea rows="3" cols="10" class="input" readonly>${todo.todoItem}`;
    
    
    
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
      tomeets = tomeets.filter((t) => t !== todo);
      localStorage.setItem("tomeets", JSON.stringify(tomeets));
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
        localStorage.setItem("tomeets", JSON.stringify(tomeets));
        updateDisplay();
      });
    });

    checkDoneBtn.addEventListener("click", (e) => {
      todo.done = checkDoneBtn.checked
      eachTodoBox.querySelector(".input").classList.toggle("done");
      localStorage.setItem("tomeets", JSON.stringify(tomeets));
      console.log(todo.done);
    });
  });
}
