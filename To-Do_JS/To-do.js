// Selecting the input box and the task list elements from the HTML
let inputBox = document.querySelector('#task-input');
let inputlist = document.querySelector('#list');


// enter keyborad key event listener---
inputBox.addEventListener("keydown", function (event) {
    if(event.key === "Enter"){
        addTask()
        inputBox.value = "";
    }
})


// Function to add new task to the list
function addTask(){
    if(inputBox.value === ''){ //check condition
        alert("Write something")
        //-------
    }
    else{
        // create a new list item 
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        inputlist.appendChild(li);
        //  edit icon
        let editBtn = document.createElement("span");
        editBtn.className = "edit";
        editBtn.innerHTML = "\u270E"; // Pencil icon
        li.appendChild(editBtn);
        //   delete cross symbol
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7"; // "×" symbol
        li.appendChild(deleteBtn);
    
        // Event listeners to edit and delete buttons
        editBtn.addEventListener("click", function() {
            editTask(li);
        });

        deleteBtn.addEventListener("click", function() {
            li.remove();
            saveData();
        });
        // 
        inputlist.appendChild(li);
    }
    inputBox.value = "";
    saveData();
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
inputlist.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);



// Function that saves the current state of the task list to localStorage
function saveData(){
    localStorage.setItem("data",JSON.stringify(inputlist.innerHTML));
}

// retrieves the saved data from localStorage and display it in the task list
function showTask(){
    inputlist.innerHTML = jSON.Parse(localStorage.getItem("data"));

     addEventListeners()
}


    // Function to add event listeners to all tasks
    function addEventListeners() {
        const lis = inputList.querySelectorAll('li');
        lis.forEach(li => {
            const editBtn = li.querySelector('.edit');
            const deleteBtn = li.querySelector('.delete');
            
            editBtn.addEventListener("click", () => editTask(li));
            deleteBtn.addEventListener("click", () => li.remove());
        });
    }

    window.onload = showTask;

    // Show the button when the user scrolls down 40px from the top of the document
    // and hide it when the user scrolls back up
    window.onscroll = function() {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    };

    // Scroll to the top of the document when the button is clicked
    scrollBtn.onclick = function() {
        // Scroll to the top of the document
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };


// // Function to update the current year
// function updateYear() {
//     const yearElement = document.getElementById('current-year');
//     yearElement.textContent = new Date().getFullYear();
// }

// // Initial update
// updateYear();

// // Update every year (on January 1st)
// setInterval(updateYear, 1000 * 60 * 60 * 24 * 365);

// Add year in the footer(CopyRight Notice)
let year = document.document.getElementById('current-year');
year.innerText = new Date().getFullYear();