'use client';

import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import { useAuth } from '../providers/AuthProvider';

export default function AuthBox() {
  const { isLogged, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
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
