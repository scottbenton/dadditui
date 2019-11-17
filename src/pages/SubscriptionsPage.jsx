import React, { useEffect } from "react";
import { FullPage } from "components/shared/FullPage";
import { useDatabase } from "api/firebase/FirebaseDatabase";
import { useCurrentUser } from "api/firebase/FirebaseUser";

import { ListKids } from "components/daddit/kids/ListKids";

export function SubscriptionsPage(props) {
  const { database } = useDatabase();
  const { user } = useCurrentUser();

  const [subscriptions, setSubscriptions] = React.useState(null);

  useEffect(() => {
    let ref;

    const snapshotFunction = async snapshot => {
      const data = snapshot.val();
      if (data) {
        const keyArray = Object.values(data);
        let subPromises = keyArray.map(key => {
          return database.ref("kids/" + key).once("value", data => data);
        });
        const subSnapshots = await Promise.all(subPromises);
        const subData = subSnapshots.map(subSnapshot => subSnapshot.val());
        setSubscriptions(subData);
      }
    };

    if (user && database) {
      ref = database.ref("users/" + user.uid + "/adoptions");
      ref.on("value", snapshotFunction);
    }
    return () => {
      if (ref) {
        ref.off("value", snapshotFunction);
      }
    };
  }, [database, user]);

  return <ListKids kids={subscriptions} />;
}
