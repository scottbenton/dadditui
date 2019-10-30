import React, { useContext } from 'react';
const FirebaseContext = React.createContext(null);

export function useAuth() {
  const firebase = useContext(FirebaseContext);
  return firebase;
}

export default FirebaseContext;