/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

import { useGlobalContext } from "./context/UserContext";
import Loading from "./components/miscellaneous/loading/Loading";

import ProfileAnalytics from "./pages/main/client/ProfileAnalytics";

const NewsFeed = React.lazy(() => import("./pages/main/client/NewsFeed"));
const Home = React.lazy(() => import("./pages/main/client/Home"));
const Portfolio = React.lazy(() => import("./pages/main/client/Portfolio"));
const About = React.lazy(() => import("./pages/main/client/About"));
const Auction = React.lazy(() => import("./pages/main/client/Auction"));
const Client = React.lazy(() => import("./pages/main/client/Client"));
const Auth = React.lazy(() => import("./pages/auth/Auth"));
// admin routes
const Admin = React.lazy(() => import("./pages/main/admin/Admin"));
const Pictures = React.lazy(() => import("./pages/main/admin/Pictures"));
const Categories = React.lazy(() => import("./pages/main/admin/Categories"));
const PictureDetails = React.lazy(() =>
  import("./pages/main/admin/PictureDetails")
);
const Orders = React.lazy(() => import("./pages/main/admin/Orders"));
const UploadPictures = React.lazy(() =>
  import("./pages/main/admin/UploadPictures")
);

const PrivateRoute = ({ children, isAdmin }) => {
  const { user } = useGlobalContext();
  const isAuthenticated = !!user;

  // Check if the user is authenticated and if isAdmin is required, check if the user is an admin
  if (isAuthenticated && (!isAdmin || (isAdmin && user.isAdmin))) {
    return children;
  }

  return <Navigate to="/" />;
};

const AuthRoute = ({ children }) => {
  const { user } = useGlobalContext();
  const isAuthenticated = !!user;
  return isAuthenticated ? (
    <Navigate to={user?.isAdmin ? "/admin" : "/client"} />
  ) : (
    children
  );
};
function App() {
  const { loadingUser } = useGlobalContext();
  if (loadingUser || false) {
    return <Loading />;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            </AuthRoute>
          }
        />
        <Route
          path="/client"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <Client />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route
            path=""
            element={
              <PrivateRoute>
                <Suspense fallback={<Loading />}>
                  <Portfolio />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="gallery"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="news"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loading />}>
                  <NewsFeed />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="auction"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loading />}>
                  <Auction />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loading />}>
                  <About />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute isAdmin>
              <Suspense fallback={<Loading />}>
                <Admin />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route
            path=""
            element={
              <Suspense fallback={<Loading />}>
                <UploadPictures />
              </Suspense>
            }
          />
          <Route
            path="pictures"
            element={
              <Suspense fallback={<Loading />}>
                <Pictures />
              </Suspense>
            }
          />
          <Route
            path="pictures/:id"
            element={
              <Suspense fallback={<Loading />}>
                <PictureDetails />
              </Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<Loading />}>
                <Categories />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<Loading />}>
                <Orders />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading />}>
                <ProfileAnalytics />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        duration={2500}
        richColors
        theme="light"
        invert={true}
      />
    </>
  );
}

export default App;
