//guardando este arquivo para quando criarmos outras telas, por exemplo a de login

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    // Se o usuário não estiver logado, redireciona para a página de login
    // A prop 'replace' impede que o usuário volte para a página anterior no histórico
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver logado, renderiza o componente filho (a tela do jogo)
  return <>{children}</>;
};

export default ProtectedRoute;