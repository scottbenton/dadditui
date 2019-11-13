import React from 'react';
import { useAuth } from 'api/firebase/FirebaseContext';

export function useCurrentUser() {
  const firebase = useAuth();
  const [user, setUser] = React.useState();

  firebase.auth.onAuthStateChanged(async authUser => {
    setUser(authUser || null);
  });

  return user;
}