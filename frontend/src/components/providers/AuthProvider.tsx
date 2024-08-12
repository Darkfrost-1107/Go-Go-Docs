/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import {
  useContext, createContext,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { secureFetch } from '@/lib/connection';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

type AuthContext = {
  user?: User;
  loading: boolean;
  isLogged: () => boolean;
  login: (data: { username: string, password: string }) => void;
  register: (data: { username: string, password: string, email: string }) => void;
  logout: () => void;
};

const userContext = createContext<AuthContext>({
  user: undefined,
  loading: false,
  isLogged: () => false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const contex = useContext(userContext);
  if (!useContext) throw new Error('contect not found');
  return contex;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user-login-token');
    if (token) {
      setLoading(true);
      secureFetch('/auth/me')
        .then((res) => res.json())
        .then((data) => {
          data = data as User;

          setUser(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const isLogged = () => !!user;

  const login = async ({ username, password }: { username: string, password: string }) => {
    try {
      const res = await secureFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user-login-token', data.token);
        setUser(data.user);
        toast({
          title: 'Welcome back!',
          description: `Welcome back, ${data.user.username}`,
        });
        router.push('/');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid username or password',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const register = async ({ username, password, email }: {
    username:string, password:string, email: string
  }) => {
    try {
      const res = await secureFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user-login-token', data.token);
        setUser(data.user);
        toast({
          title: 'Welcome!',
          description: `Welcome, ${data.user.username}`,
        });
        router.push('/');
      } else {
        toast({
          title: 'Register failed',
          description: 'Invalid username or password',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('user-login-token');
    setUser(undefined);
    window.location.reload();
  };

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        isLogged,
        login,
        register,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
