'use client';

import { Spinner } from '@/components/ui/spinner';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import { useAuth } from '../providers/AuthProvider';

export default function AuthBox() {
  const { isLogged, user, loading } = useAuth();

  console.log('loading', loading);

  if (loading) {
    return <Spinner />;
  }

  if (!isLogged || !user) {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  }

  return <Profile user={user} />;
}
