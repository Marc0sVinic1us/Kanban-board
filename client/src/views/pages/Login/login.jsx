import  { React, useState } from "react"

import './login_style.css';

import PasswordInput from "../../components/PasswordInput/passwordInput.jsx";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
      
    const formData = new FormData();
    formData.append('user_credentials', [username, password]);
    
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      
      if (data.status) {

        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("userID", data.userID);

        // Após loggado, redireciona o usuário para a tela de login
        window.location.href = "/home";
      
      } else {

        setUsername("")
        setPassword("")

        alert(data.message)
      }
    })
    .catch(err => console.error(err));

    
  }
    
  return (

    <div className="body-container">
      
      <div className="login-container">     
        
        <h1 className='signIn-title'>Login</h1>
        <form className="signIn-form" onSubmit={handleSubmit}>
          
          <div className="signIn-inputs">           
            <label className='signIn-labels'>Email:</label>
            <input 
                type="email"
                id="userEmail"
                className="username_input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                />

            <label className='signIn-labels'>Senha:</label>
            <PasswordInput 
              state={password}
              onChange={setPassword}
              showPasswordStrenghtMeter={false}
              />
          
          </div>
        
          <div className='container-btnSignIn'> 
            <button 
              type='submit'
              className='btn_signIn'
              >Entrar
            </button>
          </div>
        
        </form>

        <div className='link-signUp'>
          <p>Não tem cadastro?</p>
          <a href='/register'>Clique aqui</a>
        </div>
      
      </div>    
    </div>
  );
}

export default Login;
