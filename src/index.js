document.addEventListener("DOMContentLoaded", () => {
  // your code here

 //  accessing the whole document from html document
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const sortButton = document.getElementById("sort-tasks");
  let tasks = [];

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.getElementById("new-task-description").value;
  const priority = document.getElementById("priority").value;
  const user = document.getElementById("user").value;
  const dueDate = document.getElementById("due-date").value;

  const task ={description,priority,user,dueDate};
  tasks.push(task);//for alligning our task in the proposed order
  renderTasks();
  taskForm.reset();
});

function renderTasks(){
 taskList.innerHTML =""
 tasks.forEach((task,index) => {
   const li =document.createElement("li")
   li.innerHTML =`<strong>${task.description}</strong>-${task.user} (Due:${task.dueDate})`;
   li.style.color = getPriorityColor(task.priority);
   const deleteBtn=document.createElement("button");
   deleteBtn.textContent="Delete";
   deleteBtn.addEventListener("click",() =>{
     tasks.splice(index,1)
     renderTasks();
   });
   const editBtn =document.createElement("button");
   editBtn.textContent ="Edit"
   editBtn.addEventListener("click",() => editTask(index));
   li.appendChild(editBtn);
   li.appendChild(deleteBtn);
   taskList.appendChild(li);
 })
};

function editTask(index){
 const task = tasks[index];
 document.getElementById("new-task-description").value.description;
 document.getElementById("priority").value=task.priority;
 document.getElementById("user").value=task.user;
 document.getElementById("due-date").value=task.dueDate;

 tasks.splice(index,1);
 renderTasks();
}

function getPriorityColor(priority) {
 switch (priority){
   case "high": return "red";
   case "medium": return "orange";
   case "low": return "green";
   default:return "black";
 }
}

sortButton.addEventListener("click",()=>{
 task.sort((a,b) => {
   const priorityOrder ={"High":1, "Medium":2, "Low":3};
     return priorityOrder[a.priority]-priorityOrder[b.priority];
});
   renderTask();
  });
});
 