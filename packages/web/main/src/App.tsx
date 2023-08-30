import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store, storeHelpers } from "./store";
import { Provider } from "react-redux";
import { Home } from "./pages";

function App() {
  useEffect(() => {
    storeHelpers.init();

    return storeHelpers.destroy;
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
