import React, { useState } from 'react';
import api from '../../../../services/api'; // Usando a instância centralizada da API
import './LoginScreen.css'; // Ajuste o caminho se necessário

// Interface do Usuário (deve ser a mesma do AuthContext)
interface User {
  id: number;
  nome_usuario: string;
}

// Interface das Props que o componente recebe do App.tsx
interface LoginScreenProps {
  onLoginSuccess: (token: string, user: User) => void;
  onGoToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  // Estados para controlar os inputs do formulário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede que a página recarregue ao submeter
    setIsLoading(true);
    setError(null);

    // Estrutura de dados que o back-end espera
    const loginData = {
      nome_usuario: username,
      senha: password,
    };

    try {
      // Fazendo a chamada para a API usando nossa instância 'api'
      const response = await api.post('/usuarios/login', loginData);

      if (response.data && response.data.token && response.data.user) {
        // Se deu tudo certo, chama a função que recebemos via props
        // Isso vai atualizar o AuthContext e mudar a tela da aplicação
        onLoginSuccess(response.data.token, response.data.user);
      }
    } catch (err: any) {
      // Se a API retornar um erro (ex: 401 Credenciais inválidas)
      console.error('Erro no login:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao tentar fazer login. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
              required
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
              required
            />
          </div>
          
          {/* Mostra a mensagem de erro, se houver */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>
        <button className="secondary-button" onClick={onGoToRegister} disabled={isLoading}>
          Ainda não tem conta? Clique para registrar
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;