const taskArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
console.log(taskArray);
document.querySelector("#enter").addEventListener("click", () => {
  const task = document.querySelector("#item");
  createTask(task);
});

function displayItems() {
  let task = "";
  for (let i = 0; i < taskArray.length; i++) {
    task += `   <div class="task">
                    <div class="input-controller">
                    <textarea disabled>${taskArray[i]}</textarea>
                        <div class="edit-controller">
                            <i class="fa-solid fa-check deleteBtn"></i>
                            <i class="fa-solid fa-pen-to-square editBtn"></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`;
  }
  document.querySelector(".todo-body").innerHTML = task;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function activateEditListeners() {
  const edtBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const input = document.querySelectorAll(".input-controller textarea");
  edtBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      input[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

function updateItem(text, i) {
  taskArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i) {
  taskArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(taskArray));
  location.reload();
}

function createTask(task) {
  taskArray.unshift(task.value);
  localStorage.setItem("items", JSON.stringify(taskArray));
  location.reload();
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}
displayDate();
window.onload = function () {
  displayDate();
  displayItems();
};
