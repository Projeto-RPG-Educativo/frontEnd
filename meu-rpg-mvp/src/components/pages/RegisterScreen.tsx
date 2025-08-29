import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginScreen.css'; // Reutilizando os estilos

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Alterado de 'username' para 'email'
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3000/api/registrar';

      const response = await axios.post(apiUrl, {
        name,
        email, // Enviando 'email' em vez de 'username'
        password,
      });

      if (response.status === 201) {
        alert('Registro bem-sucedido! Faça login para continuar.');
        onRegisterSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || 'Erro ao registrar usuário.');
      } else {
        alert('Ocorreu um erro. Tente novamente mais tarde.');
      }
      console.error('Erro no registro:', error);
    }
  };

  return (
    <div className="login-screen-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">REGISTRAR</h1>
        <form onSubmit={handleRegister} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          </div>
          {/* Campo de e-mail alterado */}
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            CRIAR CONTA
          </button>
        </form>
        <button className="secondary-button" onClick={onGoToLogin}>
          Já tem uma conta? Faça Login
        </button>
      </div>
    </div>
  );
};

export default RegisterScreen;