import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { auth } from '../services/auth';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    await auth.signIn(email, password);
  }

  async function signOut() {
    await auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}