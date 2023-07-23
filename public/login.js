// const { route } = require("../routes/jwtAuth");

// Function to handle form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  login();
})

/*
// Function to show a message on the page
function showMessage(message, color) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.color = color;
}*/

function login() {
  const entredLoginCredentials = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };  
  fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(entredLoginCredentials)
  }).then(response => response.json())
    .then(data => {      
      token = data.token;
      if(token) {
        console.log('token that you got : ',token);
        localStorage.setItem('token', token);
        window.location.href = "./home.html";
      }
      else {
        alert('Invalid credentials')
      }       
    })
    .catch(error => {
      console.error('Error : ', error);
      alert("Server error")
    });
}