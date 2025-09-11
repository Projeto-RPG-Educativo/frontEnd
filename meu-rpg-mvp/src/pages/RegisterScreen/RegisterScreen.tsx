import React, { useState } from 'react';
import api from '../../services/api'; // Usando nossa instância centralizada da API
import '../LoginScreen/LoginScreen.css';     // Usando um CSS próprio (que vamos criar)

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const userData = {
      nome_usuario: name,
      email: email,
      senha: password,
    };

    try {
      // Usamos a URL que funcionou no nosso teste: /api/usuarios
      const response = await api.post('/api/usuarios/registrar', userData);

      if (response.status === 201) {
        alert('Registro bem-sucedido! Você será redirecionado para a tela de login.');
        onRegisterSuccess();
      }
    } catch (err: any) {
      console.error('Erro no registro:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao registrar usuário. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-screen-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">REGISTRAR</h1>
        <form onSubmit={handleRegister} className="login-form">
          {/* ... seu JSX para os inputs de nome, email e senha ... */}
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="login-input" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'CRIANDO...' : 'CRIAR CONTA'}
          </button>
        </form>
        <button className="secondary-button" onClick={onGoToLogin} disabled={isLoading}>
          Já tem uma conta? Faça Login
        </button>
      </div>
    </div>
  );
};

export default RegisterScreen;