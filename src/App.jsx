import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import React, { useEffect, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useQuery } from "react-query";
import { fetchData } from "./api/fetchData";
import { useGlobalContext } from "./context/UserContext";
import Loading from "./components/miscellaneous/loading/Loading";
const UploadPictures = React.lazy(() =>
  import("./pages/main/admin/UploadPictures")
);
const NewsFeed = React.lazy(() => import("./pages/main/client/NewsFeed"));
const Home = React.lazy(() => import("./pages/main/client/Home"));
const Portfolio = React.lazy(() => import("./pages/main/client/Portfolio"));
const About = React.lazy(() => import("./pages/main/client/About"));
const Orders = React.lazy(() => import("./pages/main/admin/Orders"));
const Categories = React.lazy(() => import("./pages/main/admin/Categories"));
const PictureDetails = React.lazy(() =>
  import("./pages/main/admin/PictureDetails")
);
import PrivateRoute from "./components/miscellaneous/auth/PrivateRoute";
const Auth = React.lazy(() => import("./pages/auth/Auth"));
const Client = React.lazy(() => import("./pages/main/client/Client"));
const Admin = React.lazy(() => import("./pages/main/admin/Admin"));
const Pictures = React.lazy(() => import("./pages/main/admin/Pictures"));
const Auction = React.lazy(() => import("./pages/main/client/Auction"));

function App() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const { isLoading, isFetched } = useQuery(
    "get-token",
    () => fetchData("user/get-token"),
    {
      enabled: user === null,
    }
  );

  useEffect(() => {
    if (isFetched && user && window.location.pathname === "/") {
      if (user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    }
  }, [isFetched, navigate, user, user?.isAdmin]);

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
