import React, { useEffect } from "react";
import { FullPage } from "components/shared/FullPage";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { useCurrentUser } from "api/firebase/FirebaseUser";

import { ListKids } from "components/daddit/kids/ListKids";

export function BrowsePage(props) {
  const { database } = useDatabase();
  const { user } = useCurrentUser();

  const [kids, setKids] = React.useState(null);

  useEffect(() => {
    let ref;

    const snapshotFunction = async snapshot => {
      const data = snapshot.val();
      if (data) {
        setKids(Object.values(data));
      }
    };

    if (user && database) {
      ref = database.ref("kids");
      ref.on("value", snapshotFunction);
    }
    return () => {
      if (ref) {
        ref.off("value", snapshotFunction);
      }
    };
  }, [database, user]);

  return <ListKids kids={kids} />;
}
