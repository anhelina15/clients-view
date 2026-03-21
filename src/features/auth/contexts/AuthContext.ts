import { createContext, useContext } from 'react';

export interface AuthContextType {
  apiKey: string | null;
  user: string | null;
  instance: string | null;
  isAuthenticated: boolean;
  login: (apiKey: string, user: string, instance: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
