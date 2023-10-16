import React, { useState } from "react"

import './login_style.css';
import "../../styles/global.css"

import PasswordInput from "../../components/PasswordInput/index_passwordInput";

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
        
        alert(data.message)

        // Redireciona para a página incial da aplicação
      
      } else {

        setUsername("")
        setPassword("")

        alert(data.message)
      }
    })
    .catch(err => console.error(err));

    
  }
    
  return (
    <div className="login-container">     
      
      <h1 className='singIn-title'>Login</h1>
      <form className="singIn-form" onSubmit={handleSubmit}>
        
        <div className="singIn-inputs">           
          <label className='singIn-labels'>Email:</label>
          <input 
              type="email"
              id="userEmail"
              className="username_input"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
          />

          <label className='singIn-labels'>Senha:</label>
          <PasswordInput 
            state={password}
            onChange={setPassword}
          />
        
        </div>
      
        <div className='container-btnSingIn'> 
          <button 
            type='submit'
            className='btn_singIn'
            >Entrar
          </button>
        </div>
      
      </form>

      <div className='link-singUp'>
        <p>Não tem cadastro?</p>
        <a href='/singUp'>Clique aqui</a>
      </div>
    
    </div>    
  );
}

export default Login;
