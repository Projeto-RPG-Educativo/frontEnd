import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginScreen.css';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Linha para o login de teste. Se as credenciais forem 'testuser' e 'testpass', o login é um sucesso.
    if (username === 'user' && password === '123') {
      console.log('Login de teste bem-sucedido!');
      onLoginSuccess();
      return; // Interrompe a função para não chamar a API
    }

    try {
      const apiUrl = 'http://localhost:3000/api/usuario/login';

      const response = await axios.post(apiUrl, {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('Login bem-sucedido!', response.data);
        onLoginSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          alert('Usuário não encontrado. Por favor, registre-se.');
          onGoToRegister();
        } else {
          alert(error.response.data.message || 'Erro ao fazer login. Verifique suas credenciais.');
        }
      } else {
        alert('Ocorreu um erro. Tente novamente mais tarde.');
      }
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="login-screen-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">LOGIN</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            ENTRAR
          </button>
        </form>
        <button className="secondary-button" onClick={onGoToRegister}>
          Ainda não tem conta? Clique para registrar
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;