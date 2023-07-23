// registration.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const usernameInput = document.getElementById("username");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
  
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Additional validation logic can be added here
  
      // If all validation passes, you can submit the form
      form.submit();
    });
  });
  