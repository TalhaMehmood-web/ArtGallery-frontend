/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

import { useGlobalContext } from "./context/UserContext";
import Loading from "./components/miscellaneous/loading/Loading";

import ProfileAnalytics from "./pages/main/client/ProfileAnalytics";
import ForgetPassword from "./components/miscellaneous/auth/ForgetPassword";
import ResetPassword from "./components/miscellaneous/auth/ResetPassword";

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

  if (window.location.pathname === "/auth") {
    return children; // Return the auth page directly
  }

  // Check if the user is authenticated and if isAdmin is required, check if the user is an admin
  if (isAuthenticated && (!isAdmin || (isAdmin && user.isAdmin))) {
    return children;
  }
  return <Navigate to="/" />;
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
          path="/auth"
          element={
            <Suspense fallback={<Loading />}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path="/forget-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgetPassword />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Client />
            </Suspense>
          }
        >
          <Route
            path=""
            element={
              <Suspense fallback={<Loading />}>
                <Portfolio />
              </Suspense>
            }
          />
          <Route
            path="gallery"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="news"
            element={
              <Suspense fallback={<Loading />}>
                <NewsFeed />
              </Suspense>
            }
          />
          <Route
            path="auction"
            element={
              <Suspense fallback={<Loading />}>
                <Auction />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
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
