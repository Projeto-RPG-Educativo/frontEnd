<<<<<<< HEAD
import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define o formato que esperamos para os dados de um usuário
interface User {
  id: number;
  nome_usuario: string;
  // Adicione outros campos do usuário se necessário
}

// Define todas as informações que nosso contexto vai fornecer
interface AuthContextData {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Cria o Contexto
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Cria o Componente Provedor que vai "abraçar" nossa aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // O estado inicial de 'isLoggedIn' verifica se já existe um token no navegador
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true se houver token, false se não
  });

  // Função para executar quando o login for bem-sucedido
=======
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// NOVO: Vamos definir um tipo para o nosso usuário
interface User {
  id: number;
  nome_usuario: string;
  // Adicione aqui outros campos que vierem do seu back-end, se quiser
}

// ALTERADO: A interface do contexto agora inclui o 'user'
interface AuthContextData {
  isLoggedIn: boolean;
  user: User | null; // O usuário pode ser do tipo User ou nulo (se não estiver logado)
  login: (token: string, userData: User) => void; // A função login agora também espera os dados do usuário
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // NOVO: Adicionamos um estado para guardar os dados do usuário
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Ao iniciar, verificamos se já existe um token para manter o usuário logado
    const token = localStorage.getItem('authToken');
    return !!token;
  });

  // ALTERADO: A função login agora recebe 'userData' e o armazena no estado
>>>>>>> copiaMurilo
  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

<<<<<<< HEAD
  // Função para executar o logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
  };

=======
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null); // Limpa os dados do usuário ao fazer logout
    setIsLoggedIn(false);
  };

  // O 'user' agora também é fornecido para toda a aplicação
>>>>>>> copiaMurilo
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};