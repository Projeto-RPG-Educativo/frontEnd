import { createContext, useState } from 'react';
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

// Cria o Contexto com um valor padrão para autocompletar
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
  const login = (token: string, userData: User) => {
    console.log('AuthContext: Login bem-sucedido! Alterando isLoggedIn para true.');
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Função para executar o logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};