import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store, storeHelpers } from "./store";
import { Provider } from "react-redux";
import {
  Home,
  PrivacyPolicy,
  SimpleVendorSearch,
  TempImageUploader,
  VendorAuth,
  VendorDetails,
  VendorSearch,
} from "./pages";
import { AppLayout } from "./components";
import { HelmetProvider } from "react-helmet-async";
import { FormSpaceBetween } from "./components/SpaceBetween/SpaceBetween";
import { useParams } from "react-router-dom";
import { RouteHelper, WebMainRouteHelper } from "./utils/RouteHelper";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  VendorDashboardLayout,
  VendorDashboardListingDetails,
  VendorDashboardMedia,
} from "pages/VendorDashboard";

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
                  path={RouteHelper.UserProfile()}
                  element={<TempParamPage />}
                />

                <Route path="/legal">
                  <Route
                    path={RouteHelper.PrivacyPolicy()}
                    element={<PrivacyPolicy />}
                  />
                </Route>

                <Route
                  path={RouteHelper.VendorLogin()}
                  element={<VendorAuth authType="login" />}
                />
                <Route
                  path={RouteHelper.VendorSignup()}
                  element={<VendorAuth authType="register" />}
                />

                <Route element={<VendorDashboardLayout />}>
                  <Route
                    path={RouteHelper.VendorDashboard.Listing()}
                    element={<VendorDashboardListingDetails />}
                  />
                  <Route
                    path={RouteHelper.VendorDashboard.Media()}
                    element={<VendorDashboardMedia />}
                  />
                </Route>

                <Route path="/temp" element={<TempImageUploader />} />
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
