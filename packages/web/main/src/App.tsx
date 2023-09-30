import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store, storeHelpers } from "./store";
import { Provider } from "react-redux";
import {
  Home,
  PrivacyPolicy,
  SimpleVendorSearch,
  VendorDetails,
  VendorPricing,
  VendorSearch,
} from "./pages";
import { AppLayout } from "./components";
import { HelmetProvider } from "react-helmet-async";
import { FormSpaceBetween } from "./components/SpaceBetween/SpaceBetween";
import { useParams } from "react-router-dom";
import { RouteHelper, WebMainRouteHelper } from "./utils/RouteHelper";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    storeHelpers.init();

    return storeHelpers.destroy;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route element={<AppLayout />}>
                <Route
                  path={RouteHelper.Home()}
                  element={<SimpleVendorSearch />}
                />
                <Route path={"/test"} element={<Home />} />

                <Route
                  path={RouteHelper.VendorSearch()}
                  element={<VendorSearch />}
                />

                <Route
                  path={RouteHelper.VendorDetails()}
                  element={<VendorDetails />}
                />

                <Route
                  path={RouteHelper.VendorPricing()}
                  element={<VendorPricing />}
                />

                <Route
                  path={RouteHelper.UserProfile()}
                  element={<TempParamPage />}
                />

                <Route path="/legal">
                  <Route
                    path={RouteHelper.PrivacyPolicy()}
                    element={<PrivacyPolicy />}
                  />
                  R
                </Route>
              </Route>
            </Routes>
          </Router>
        </Provider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

const TempParamPage = () => {
  const { userId } = useParams<WebMainRouteHelper.UserProfile.UrlParams>();

  return (
    <FormSpaceBetween>
      <h1>Temp Params Page</h1>
      <h1>{userId}</h1>
    </FormSpaceBetween>
  );
};

export default App;
