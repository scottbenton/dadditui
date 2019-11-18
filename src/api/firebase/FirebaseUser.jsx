import React, { useEffect } from "react";
import { useAuth } from "api/firebase/FirebaseContext";
import { useDatabase } from "./FirebaseDatabase";

export function useCurrentUser() {
  const firebase = useAuth();
  const { database } = useDatabase();
  const [user, setUser] = React.useState({});
  const [authUser, setAuthUser] = React.useState(null);
  const [dbUser, setDBUser] = React.useState(null);
  const [userRef, setUserRef] = React.useState();

  firebase.auth.onAuthStateChanged(setAuthUser);

  useEffect(() => {
    if (authUser && database && !userRef) {
      setUserRef(database.ref("users/" + authUser.uid));
    } else if (!authUser) {
      setDBUser({});
    }
  }, [authUser, database, userRef]);

  useEffect(() => {
    const updateUser = dbUserSnapshot => {
      setDBUser(dbUserSnapshot.val());
    };

    if (userRef) {
      userRef.on("value", updateUser);
    }

    return () => {
      if (userRef) {
        userRef.off("value", updateUser);
      }
    };
  }, [userRef]);

  useEffect(() => {
    if (!authUser || !authUser.uid) {
      setUser({});
    } else {
      setUser({ ...authUser, ...dbUser });
    }
  }, [authUser, dbUser]);

  return { user };
}
