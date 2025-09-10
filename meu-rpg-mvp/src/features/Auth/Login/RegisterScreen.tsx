import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Importa o motion
import './LoginScreen.css';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

// 🎯 Variantes para as animações
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
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

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      nome_usuario: name,
      email: email,
      senha: password,
    };

    try {
      const apiUrl = 'http://localhost:3000/api/usuarios/registrar';
      const response = await axios.post(apiUrl, userData);

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
          REGISTRAR
        </motion.h1>
        <motion.form
          onSubmit={handleRegister}
          className="login-form"
          variants={containerVariants}
        >
          <motion.div
            className="input-group"
            variants={itemVariants}
          >
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          </motion.div>
          <motion.div
            className="input-group"
            variants={itemVariants}
          >
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            CRIAR CONTA
          </motion.button>
        </motion.form>
        <motion.button
          className="secondary-button"
          onClick={onGoToLogin}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Já tem uma conta? Faça Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RegisterScreen;