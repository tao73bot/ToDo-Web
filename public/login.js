// Function to handle form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Get the input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Replace the following condition with your authentication logic
    
  });
  
  // Function to show a message on the page
  function showMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
  }
  