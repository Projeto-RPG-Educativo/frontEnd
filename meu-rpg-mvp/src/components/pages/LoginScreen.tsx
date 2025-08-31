import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginScreen.css';

interface LoginScreenProps {
  onLoginSuccess: (token: string, user: any) => void; // Ajustado para receber dados
  onGoToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- A CORREÇÃO CRÍTICA ESTÁ AQUI ---
    // Criamos um objeto 'loginData' que mapeia os nomes das variáveis do front-end
    // para as chaves que o back-end espera.
    const loginData = {
      nome_usuario: username, // A variável de estado 'username' vira a propriedade 'nome_usuario'
      senha: password,      // O back-end espera 'senha', não 'password'
    };

    try {
      const apiUrl = 'http://localhost:3000/api/usuarios/login';

      // Agora enviamos o objeto 'loginData' que tem o formato correto
      const response = await axios.post(apiUrl, loginData);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log('Login bem-sucedido!', response.data);
        // Passamos o token e os dados do usuário para a função de sucesso
        onLoginSuccess(token, user); 
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Mostra a mensagem de erro que vem do back-end (ex: "Credenciais inválidas")
        alert(error.response.data.message || 'Erro ao fazer login.');
      } else {
        alert('Ocorreu um erro de conexão. Tente novamente mais tarde.');
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