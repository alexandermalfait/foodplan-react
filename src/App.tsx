import React from 'react';
import './App.css';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

function App() {
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
              And the dinner is...
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default App;
