import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store, storeHelpers } from "./store";
import { Provider } from "react-redux";
import { Home, PrivacyPolicy } from "./pages";
import { AppLayout } from "./components";
import { HelmetProvider } from "react-helmet-async";
import { FormSpaceBetween } from "./components/SpaceBetween/SpaceBetween";
import { useParams } from "react-router-dom";
import { RouteHelper } from "./utils/RouteHelper";

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
              <Route path={RouteHelper.Home()} element={<Home />} />

              <Route
                path={RouteHelper.UserProfile()}
                element={<TempParamPage />}
              />

              <Route path="/legal">
                <Route path="/legal/privacy" element={<PrivacyPolicy />} />R
              </Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

const TempParamPage = () => {
  const { userId } = useParams<typeof RouteHelper.UserProfileParams>();

  return (
    <FormSpaceBetween>
      <h1>Temp Params Page</h1>
      <h1>{userId}</h1>
    </FormSpaceBetween>
  );
};

export default App;
