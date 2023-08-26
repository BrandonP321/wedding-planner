import React from "react";
import {
  Button,
  ButtonLink,
  ExternalLink,
  SpaceBetween,
} from "@wedding-planner/shared/web";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";

function App() {
  return (
    <Router>
      <h1>Something</h1>
      <SpaceBetween size="s">
        <Button>asdf</Button>
        <Button>asdf</Button>
        <ButtonLink to="/asdf" rightIcon={faArrowUpRight}>
          asdf
        </ButtonLink>
        <p>
          This is a <ExternalLink to={"/"}>Link</ExternalLink>
        </p>
      </SpaceBetween>
    </Router>
  );
}

export default App;
