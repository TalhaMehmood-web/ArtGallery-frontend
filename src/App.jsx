/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useQuery } from "react-query";
import { fetchData } from "./api/fetchData";
import { useGlobalContext } from "./context/UserContext";
import { useNavigate, Navigate } from "react-router-dom";
import Loading from "./components/miscellaneous/loading/Loading";
import UploadPictures from "./pages/main/admin/UploadPictures";
import Home from "./pages/main/client/Home";
import NewsFeed from "./pages/main/client/NewsFeed";
import Portfolio from "./pages/main/client/Portfolio";
import About from "./pages/main/client/About";
import Orders from "./pages/main/admin/Orders";
import Categories from "./pages/main/admin/Categories";
import PictureDetails from "./pages/main/admin/PictureDetails";
const Auth = React.lazy(() => import("./pages/auth/Auth"));
const Client = React.lazy(() => import("./pages/main/client/Client"));
const Admin = React.lazy(() => import("./pages/main/admin/Admin"));
const Pictures = React.lazy(() => import("./pages/main/admin/Pictures"));
const Auction = React.lazy(() => import("./pages/main/client/Auction"));

const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext();
  return user ? children : <Navigate to="/" />;
};

function App() {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    "get-token",
    () => fetchData("user/get-token"),
    {
      enabled: user === null,
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  // Navigate to the saved route from localStorage when user is set
  useEffect(() => {
    if (!user) return;
    if (user && user?.isAdmin) {
      navigate("/admin");
    } else if (!user?.isAdmin) {
      navigate("/client");
    }
  }, [user, user?.isAdmin, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Auth />
            </Suspense>
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
                <Suspense
                  fallback={() => <div className="text-black">loading....</div>}
                >
                  <About />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute>
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
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
