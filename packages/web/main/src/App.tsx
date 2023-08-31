import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store, storeHelpers } from "./store";
import { Provider } from "react-redux";
import { Home, PrivacyPolicy } from "./pages";
import { AppLayout } from "./components";
import { HelmetProvider } from "react-helmet-async";

function App() {
  useEffect(() => {
    storeHelpers.init();

    return storeHelpers.destroy;
  }, []);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />

              <Route path="/legal">
                <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
