// Theme 
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Selecting the input box and the task list elements from the HTML
let inputBox = document.querySelector('#task-input');
let inputlist = document.querySelector('#list');

// Enter keyboard key event listener
inputBox.addEventListener("keydown", function (event) {
    if(event.key === "Enter"){
        addTask(inputBox.value);
        inputBox.value = "";
    }
});

// Function to add new task to the list
function addTask(taskText){
    if(!taskText || taskText.trim() === ''){ 
        alert("Write something"); // Show alert if the input is empty
    } else {
        // Create a new list item 
        let li = document.createElement("li");
        li.innerHTML = taskText.trim();

        // Edit icon
        let editBtn = document.createElement("span");
        editBtn.className = "edit";
        editBtn.innerHTML = "\u270E"; // Pencil icon
        li.appendChild(editBtn);

        // Delete cross symbol
        let deleteBtn = document.createElement("span");
        deleteBtn.className = "delete";
        deleteBtn.innerHTML = "\u00d7"; // "×" symbol
        li.appendChild(deleteBtn);

        // Event listeners to edit and delete buttons
        editBtn.addEventListener("click", () => editTask(li));
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveData();
        });

        inputlist.appendChild(li);
        saveData();
    }
}

// Function to edit the task
function editTask(li) {
    let currentText = li.firstChild.textContent;
    let newText = prompt("Edit your task", currentText);
    if (newText !== null && newText.trim() !== "") {
        li.firstChild.textContent = newText.trim();
        saveData();
    }
}

// Function that saves the current state of the task list to localStorage
function saveData(){
    const tasks = [];
    inputlist.querySelectorAll('li').forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Retrieves the saved data from localStorage and displays it in the task list
function showTask(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(taskText => addTask(taskText));
    }
}

// Load tasks from localStorage when the window loads
window.onload = showTask;

// Show the button when the user scrolls down 40px from the top of the document
window.onscroll = function() {
    const scrollBtn = document.getElementById('scrollBtn');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Scroll to the top of the document when the button is clicked
document.getElementById('scrollBtn').onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// Add year in the footer (CopyRight Notice)
document.getElementById('current-year').innerText = new Date().getFullYear();