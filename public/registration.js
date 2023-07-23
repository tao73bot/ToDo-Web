// registration.js
/*
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
  
      signup();

      // Additional validation logic can be added here
  
      // If all validation passes, you can submit the form
      //form.submit();
    });
  });
*/
  document.getElementById('register-button').addEventListener("click", e => signup(e))
  
  function signup(e) {
    e.preventDefault();
    const entredSignupCredentials = {
      name: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById("email").value
    };
    console.log(entredSignupCredentials);
    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entredSignupCredentials)
    }).then(response => response.json())
      .then(data => {
        token = data.token;
        if (token) {
          console.log('token that you got : ', token);
          alert('Account Created Successfully');
          window.location.href = "./login.html";
        }
        else {
          alert(data.message)
        }
      })
      .catch(error => {
        alert('Server Error')
      });
  }