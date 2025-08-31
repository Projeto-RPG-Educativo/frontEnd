import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginScreen.css';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3000/api/registrar';

      const response = await axios.post(apiUrl, {
        name,
        email,
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

  // --- Função para preencher os campos com dados de teste da API ---
  const handleFillWithTestData = async () => {
    try {
      // Endpoint que retorna dados de teste
      const Url = 'http://localhost:3000/api/usuario/registrar'; // Altere para a URL correta da sua API de teste

      const response = await axios.get(Url);

      // Assumindo que a API retorna um objeto com 'name', 'email' e 'password'
      if (response.status === 200 && response.data) {
        const { name, email, password } = response.data;
        setName(name);
        setEmail(email);
        setPassword(password);
      } else {
        alert('Não foi possível obter os dados de teste da API.');
      }
    } catch (error) {
      alert('Erro ao carregar dados de teste. Verifique a conexão com a API.');
      console.error('Erro ao carregar dados:', error);
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
        {/* Novo botão para preencher dados de teste */}
        <button className="secondary-button" onClick={handleFillWithTestData}>
          Preencher com Dados de Teste
        </button>
        <button className="secondary-button" onClick={onGoToLogin}>
          Já tem uma conta? Faça Login
        </button>
      </div>
    </div>
  );
};

export default RegisterScreen;