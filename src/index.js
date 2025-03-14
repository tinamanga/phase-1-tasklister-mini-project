document.addEventListener("DOMContentLoaded", () => {
  // your code here
  document.addEventListener('submit', (event)=>{
    event.preventDefault();

  // Get the value of form input with id new-task-description
    let taskInput=document.getElementById("new-task-description").value;
   console.log("Task: "+taskInput);

  //   // Add/display the value to the My Todos List
    let taskList=document.getElementById("task"); //<ul id="task></ul>"
    var li=document.createElement("li"); // <li></li>
   li.appendChild(document.createTextNode(taskInput));
    taskList.appendChild(li);

  })
});
