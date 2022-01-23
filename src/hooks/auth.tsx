import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  gender: string;
}

interface AuthState {
  user: User;
  token: string;
  refreshToken: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signOut(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  getRefreshToken(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const ISSERVER = typeof window === 'undefined';

    if (!ISSERVER) {
      const token = localStorage.getItem('@ioasysBook:token');
      const refreshToken = localStorage.getItem('@ioasysBook:refreshToken');
      const user = localStorage.getItem('@ioasysBook:user');

      if (token && user && refreshToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return { token, refreshToken, user: JSON.parse(user) };
      }
    }

    return {} as AuthState;
  });

  const getRefreshToken = useCallback(async () => {
    const currentToken = localStorage.getItem('@ioasysBook:token');
    const currentRefreshToken = localStorage.getItem(
      '@ioasysBook:refreshToken',
    );

    if (currentToken && currentRefreshToken) {
      const response = await api.post('/auth/refresh-token', {
        refreshToken: currentRefreshToken,
      });

      const token = response.headers['authorization'];
      const refreshToken = response.headers['refresh-token'];

      localStorage.setItem('@ioasysBook:token', token);
      localStorage.setItem('@ioasysBook:refreshToken', refreshToken);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData(state => ({
        token,
        refreshToken,
        user: state.user,
      }));
    }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth/sign-in', {
      email,
      password,
    });

    const user = response.data;
    const token = response.headers['authorization'];
    const refreshToken = response.headers['refresh-token'];

    localStorage.setItem('@ioasysBook:token', token);
    localStorage.setItem('@ioasysBook:refreshToken', refreshToken);
    localStorage.setItem('@ioasysBook:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setData({ token, user, refreshToken });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ioasysBook:user');
    localStorage.removeItem('@ioasysBook:token');
    localStorage.removeItem('@ioasysBook:refreshToken');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
