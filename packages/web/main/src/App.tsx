import React from "react";
import { Button, ButtonLink, SpaceBetween } from "@wedding-planner/shared/web";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <h1>Something</h1>
      <SpaceBetween size="s">
        <Button>asdf</Button>
        <Button>asdf</Button>
        <ButtonLink to="/asdf">asdf</ButtonLink>
      </SpaceBetween>
    </Router>
  );
}

export default App;
