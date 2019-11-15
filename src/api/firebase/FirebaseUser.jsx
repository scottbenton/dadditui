import React, { useEffect } from "react";
import { useAuth } from "api/firebase/FirebaseContext";

export function useCurrentUser() {
  const firebase = useAuth();
  const [user, setUser] = React.useState(null);

  firebase.auth.onAuthStateChanged(async authUser => {
    console.log(authUser);
    setUser(authUser ? authUser : null);
  });

  const updateUser = () => {
    console.log(firebase.auth.currentUser);
    setUser({ ...firebase.auth.currentUser });
  };

  return { user, setUser, updateUser };
}
