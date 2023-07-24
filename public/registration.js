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