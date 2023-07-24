
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  login();
})

document.getElementById("lbtn").addEventListener("click", function (event) {
  event.preventDefault(); 

  login();
})


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
        localStorage.setItem('email', document.getElementById('email').value);
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