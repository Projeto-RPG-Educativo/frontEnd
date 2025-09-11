import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LoginScreen from '../LoginScreen/LoginScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';

const AuthScreen: React.FC = () => {
  // Pegamos a função de login do nosso contexto
  const { login } = useContext(AuthContext);

  // A lógica que estava no App.tsx agora vive aqui
  const [isRegistering, setIsRegistering] = useState(false);

  if (isRegistering) {
    return <RegisterScreen onRegisterSuccess={() => setIsRegistering(false)} onGoToLogin={() => setIsRegistering(false)} />;
  } else {
    return <LoginScreen onLoginSuccess={login} onGoToRegister={() => setIsRegistering(true)} />;
  }
};

export default AuthScreen;