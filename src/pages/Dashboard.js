import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Login from './Login';
import useStyles from "../layout/Style";
import Main from "../components/Main";

const Dashboard = () => {
  const classes = useStyles();
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  if (!token) {
    return <Login onLoginSuccess={setToken} />;
  }
  return (
    <Paper className={classes.control}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Main onLogout={setToken} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
