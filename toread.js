
let toreads = JSON.parse(localStorage.getItem("toreads")) || [];
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

  toreads.push(todo);
  localStorage.setItem("toreads", JSON.stringify(toreads));
  input.value = "";


  if (!todo.todoItem) return;
  updateDisplay();
});

updateDisplay();


function updateDisplay() {
  todoList.innerHTML = "";
  todo.addColon()


  toreads.forEach(todo => {
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
      toreads = toreads.filter((t) => t !== todo);
      localStorage.setItem("toreads", JSON.stringify(toreads));
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
        localStorage.setItem("toreads", JSON.stringify(toreads));
        updateDisplay();
      });
    });

    checkDoneBtn.addEventListener("click", (e) => {
      todo.done = checkDoneBtn.checked
      eachTodoBox.querySelector(".input").classList.toggle("done");
      localStorage.setItem("toreads", JSON.stringify(toreads));
      console.log(todo.done);
    });
  });
}
