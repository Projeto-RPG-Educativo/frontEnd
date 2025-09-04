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
  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null); // Limpa os dados do usuário ao fazer logout
    setIsLoggedIn(false);
  };

  // O 'user' agora também é fornecido para toda a aplicação
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};