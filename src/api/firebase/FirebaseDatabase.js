import React, { useEffect } from "react";
import { useAuth } from "api/firebase/FirebaseContext";

export function useDatabase() {
  const firebase = useAuth();
  const db = firebase.doGetDatabase();
  const [database, setDatabase] = React.useState();
  useEffect(() => {
    if (database !== db) {
      setDatabase(db);
    }
  }, [db, database]);

  return { database };
}
