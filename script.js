function toggleForm() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
}

function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Retrieve stored user data from Local Storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(user => user.username === username);

    if (foundUser) {
        if (foundUser.password === password) {
            // Simulate login success
            window.location.href = "diary.html"; // Redirect to diary page
        } else {
            // If password is incorrect
            alert("Incorrect password. Did you forget your password?");
        }
    } else {
        alert("Username not found. Please sign up or check your credentials.");
    }
}

function validateSignup(event) {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    // Retrieve existing users from Local Storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find(user => user.username === username);

    if (userExists) {
        alert("Username already exists. Please choose a different one.");
    } else if (username && password) {
        // Save new user data to Local Storage
        storedUsers.push({ username, password });
        localStorage.setItem("users", JSON.stringify(storedUsers));
        window.location.href = "diary.html"; // Redirect to diary page after signup
    } else {
        alert("Please fill in both fields.");
    }
}
//script for the diary part
// Function to set the current date and time in the diary entry
// Function to set the current date and time in the diary entry
function setCurrentDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Format date and time
    document.getElementById("currentDateTime").innerText = dateTimeString;
}

// Function to handle form submission
function saveEntry(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const diaryEntry = document.getElementById("diaryEntry").value;
    const dateTime = document.getElementById("currentDateTime").innerText;

    // Create an entry object
    const entry = {
        dateTime: dateTime,
        content: diaryEntry,
    };

    // Save the entry to Local Storage under the key 'myDiaries'
    const diaryEntries = JSON.parse(localStorage.getItem("myDiaries")) || [];
    diaryEntries.push(entry);
    localStorage.setItem("myDiaries", JSON.stringify(diaryEntries));

    // Display the new entry in the entry list
    displayEntries();

    // Clear the textarea after saving
    document.getElementById("diaryEntry").value = '';
}

// Function to display all diary entries
function displayEntries() {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = ''; // Clear existing entries

    const diaryEntries = JSON.parse(localStorage.getItem("myDiaries")) || [];
    diaryEntries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "diary-entry";
        entryDiv.innerHTML = `
            <strong>My Diary - ${entry.dateTime}</strong> <!-- Updated title -->
            <p>${entry.content}</p>
            <button onclick="deleteEntry(${diaryEntries.indexOf(entry)})">Delete Entry</button> <!-- Delete button -->
        `;
        entryList.appendChild(entryDiv);
    });
}

// Function to clear the current diary entry input
function clearEntry() {
    document.getElementById("diaryEntry").value = ''; // Clear the textarea
}

// Function to delete a diary entry
function deleteEntry(index) {
    const diaryEntries = JSON.parse(localStorage.getItem("myDiaries")) || [];
    diaryEntries.splice(index, 1); // Remove the entry at the specified index
    localStorage.setItem("myDiaries", JSON.stringify(diaryEntries)); // Update localStorage
    displayEntries(); // Refresh the displayed entries
}

// Sample function to populate other diaries
function populateOtherDiaries() {
    const otherDiaries = [
        { date: "2024-10-10 08:30 AM", entry: "Today I went hiking with friends. The view was breathtaking!" },
        { date: "2024-10-09 07:15 PM", entry: "I started reading a new book. Can't put it down!" },
        { date: "2024-10-08 09:00 AM", entry: "Had a productive day at work. Feeling accomplished!" },
    ];

    const otherDiaryList = document.getElementById("otherDiaryList");
    otherDiaries.forEach(diary => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "diary-entry other-diary-entry";
        entryDiv.innerHTML = `<strong>${diary.date}</strong><p>${diary.entry}</p>`;
        otherDiaryList.appendChild(entryDiv);
    });
}

// Set the current date and time and display entries when the page loads
window.onload = function() {
    setCurrentDateTime();
    displayEntries(); // Display stored entries on page load
    populateOtherDiaries(); // Populate the other diaries on page load
};
// Function to handle adding a reminder
function addReminder(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const reminderText = document.getElementById("reminderText").value;
    const reminderDate = document.getElementById("reminderDate").value;

    // Create a reminder object
    const reminder = {
        text: reminderText,
        date: reminderDate,
    };

    // Save the reminder to Local Storage
    const reminders = JSON.parse(localStorage.getItem("eventReminders")) || [];
    reminders.push(reminder);
    localStorage.setItem("eventReminders", JSON.stringify(reminders));

    // Clear the input fields
    document.getElementById("reminderText").value = '';
    document.getElementById("reminderDate").value = '';

    // Display the updated list of reminders
    displayReminders();
}

// Function to display all reminders
function displayReminders() {
    const reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = ''; // Clear existing reminders

    const reminders = JSON.parse(localStorage.getItem("eventReminders")) || [];
    reminders.forEach((reminder, index) => {
        const reminderDiv = document.createElement("div");
        reminderDiv.className = "reminder-entry";
        reminderDiv.innerHTML = `
            <strong>${reminder.date}</strong> - ${reminder.text}
            <button onclick="deleteReminder(${index})">Delete</button>
        `;
        reminderList.appendChild(reminderDiv);
    });
}

// Function to delete a reminder
function deleteReminder(index) {
    const reminders = JSON.parse(localStorage.getItem("eventReminders")) || [];
    reminders.splice(index, 1); // Remove the reminder at the specified index
    localStorage.setItem("eventReminders", JSON.stringify(reminders)); // Update localStorage
    displayReminders(); // Refresh the displayed reminders
}

// Display reminders when the page loads
window.onload = function() {
    displayReminders(); // Display stored reminders on page load
};
// Function to handle adding a to-do item
function addTodoItem(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const todoText = document.getElementById("todoText").value;

    // Create a to-do object
    const todoItem = {
        text: todoText,
        completed: false, // Default state as not completed
    };

    // Save the to-do item to Local Storage
    const todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
    todoItems.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoItems));

    // Clear the input field
    document.getElementById("todoText").value = '';

    // Display the updated list of to-do items
    displayTodoItems();
}

// Function to display all to-do items
function displayTodoItems() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ''; // Clear existing to-do items

    const todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
    todoItems.forEach((todo, index) => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-entry";
        todoDiv.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodoComplete(${index})">
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
            <button onclick="deleteTodoItem(${index})">Delete</button>
        `;
        todoList.appendChild(todoDiv);
    });
}

// Function to toggle completion status of a to-do item
function toggleTodoComplete(index) {
    const todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
    todoItems[index].completed = !todoItems[index].completed; // Toggle the completion status
    localStorage.setItem("todoList", JSON.stringify(todoItems)); // Update localStorage
    displayTodoItems(); // Refresh the displayed to-do items
}

// Function to delete a to-do item
function deleteTodoItem(index) {
    const todoItems = JSON.parse(localStorage.getItem("todoList")) || [];
    todoItems.splice(index, 1); // Remove the to-do item at the specified index
    localStorage.setItem("todoList", JSON.stringify(todoItems)); // Update localStorage
    displayTodoItems(); // Refresh the displayed to-do items
}

// Display to-do items when the page loads
window.onload = function() {
    displayReminders(); // Display stored reminders on page load
    displayTodoItems(); // Display stored to-do items on page load
};
// List of sample quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" }
];

// Function to display a quote of the day
function displayQuote() {
    const currentTime = new Date().getTime();
    const storedQuote = JSON.parse(localStorage.getItem("quoteOfTheDay"));
    
    // Check if 24 hours have passed or if no quote is stored
    if (!storedQuote || currentTime - storedQuote.timestamp >= 86400000) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const newQuote = quotes[randomIndex];
        
        // Save the new quote and current timestamp in localStorage
        localStorage.setItem("quoteOfTheDay", JSON.stringify({
            text: newQuote.text,
            author: newQuote.author,
            timestamp: currentTime
        }));

        // Display the new quote
        document.getElementById("quoteText").innerText = `"${newQuote.text}"`;
        document.getElementById("quoteAuthor").innerText = `- ${newQuote.author}`;
    } else {
        // If less than 24 hours, display the stored quote
        document.getElementById("quoteText").innerText = `"${storedQuote.text}"`;
        document.getElementById("quoteAuthor").innerText = `- ${storedQuote.author}`;
    }
}

// Call the displayQuote function when the page loads
window.onload = function() {
    displayQuote();
    setCurrentDateTime();
    displayEntries();
    populateOtherDiaries();
}

// Image gallery logic
const galleryImages = [
    "images/jeshoots-com-9n1USijYJZ4-unsplash.jpg",
    "images/gabrielle-henderson-M4lve6jR26E-unsplash.jpg",
    "images/noemi-jimenez-Zir_WPh3E7E-unsplash.jpg",
    "images/photo4.jpg"
];
let currentImageIndex = 0;

function changeImage() {
    const galleryImage = document.getElementById("galleryImage");
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    galleryImage.src = galleryImages[currentImageIndex];
}

// Automatically change the image every 5 seconds
setInterval(changeImage, 5000);

// Existing Login and Signup form toggle
function toggleForm() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
}
//search functionality in the diary system
function searchEntries() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const entryList = document.getElementById("entryList");
    const diaryEntries = JSON.parse(localStorage.getItem("myDiaries")) || [];

    // Clear existing entries in the display
    entryList.innerHTML = '';

    // Filter and display entries that match the search term
    diaryEntries.forEach((entry) => {
        if (entry.content.toLowerCase().includes(searchTerm)) {
            const entryDiv = document.createElement("div");
            entryDiv.className = "diary-entry";
            entryDiv.innerHTML = `
                <strong>My Diary - ${entry.dateTime}</strong> <!-- Updated title -->
                <p>${entry.content}</p>
                <button onclick="deleteEntry(${diaryEntries.indexOf(entry)})">Delete Entry</button> <!-- Delete button -->
            `;
            entryList.appendChild(entryDiv);
        }
    });
}
