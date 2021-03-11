import React from 'react';
import './App.css';
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import {Planner} from "./planner/Planner";


function App() {
  return (<>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
              And the dinner is...
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
          <Planner />
      </Container>
      </>
  );
}

export default App;
