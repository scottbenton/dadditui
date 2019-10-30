import React from 'react';
import { useAuth } from 'api/auth/FirebaseContext';
import { api } from 'api/api';

export function useCurrentUser() {
  const firebase = useAuth();
  const [user, setUser] = React.useState();

  firebase.auth.onAuthStateChanged(async authUser => {
    console.log(authUser);
    if (authUser) {
      await authUser.getIdToken(true).then((token) => {
        api.setHeader('token', token);
      });
    }
    else {
      await api.setHeader('token', null);
    }
    setUser(authUser || null);
  });

  return user;
}