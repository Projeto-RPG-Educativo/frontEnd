import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './LoginScreen.css';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'user' && password === '123') {
      console.log('Login de teste bem-sucedido!');
      onLoginSuccess();
      return;
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
      <motion.div
        className="login-form-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="login-title"
          variants={itemVariants}
        >
          LOGIN
        </motion.h1>
        <motion.form
          onSubmit={handleLogin}
          className="login-form"
          variants={containerVariants}
        >
          <motion.div
            className="input-group"
            variants={itemVariants}
          >
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </motion.div>
          <motion.div
            className="input-group"
            variants={itemVariants}
          >
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </motion.div>
          <motion.button
            type="submit"
            className="login-button"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ENTRAR
          </motion.button>
        </motion.form>
        <motion.button
          className="secondary-button"
          onClick={onGoToRegister}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ainda não tem conta? Clique para registrar
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginScreen;