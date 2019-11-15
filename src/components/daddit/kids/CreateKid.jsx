import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid } from "@material-ui/core";
import { updateStateObjectByKey } from "utilities/StateHelpers";
import { useDatabase } from "api/firebase/FirebaseDatabase";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  buttonHolder: {
    display: "flex",
    justifyContent: "center"
  }
}));

export function CreateKid(props) {
  const { handleCancel } = props;

  const { database } = useDatabase();

  console.log(database);

  const classes = useStyles();
  const [kidData, setKidData] = React.useState({});
  const updateKidDataByKey = (key, value) =>
    updateStateObjectByKey(key, value, setKidData);

  const handleCreate = () => {
    database
      .ref("kids/" + kidData.name)
      .once("value")
      .then(snapshot => {
        if (!snapshot.exists()) {
          database.ref("kids/" + kidData.name).set(kidData);
        }
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Kid Name"
            variant="filled"
            value={kidData.name || ""}
            fullWidth
            onChange={evt => updateKidDataByKey("name", evt.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Kid Description"
            variant="filled"
            fullWidth
            value={kidData.description || ""}
            onChange={evt =>
              updateKidDataByKey("description", evt.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonHolder}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => handleCreate()}
          >
            Create Kid
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
