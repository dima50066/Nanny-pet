import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { refreshSession } from "./redux/auth/operations";
import { selectIsLoading, selectToken } from "./redux/auth/selectors";
import { AppDispatch } from "./redux/store";
import { ToastContainer } from "react-toastify";
import Loader from "./shared/loader/Loader";
import { fetchMyNannyProfile } from "./redux/nanny/operations";

const HomePage = React.lazy(() => import("./pages/home/HomePage"));
const NanniesPage = React.lazy(() => import("./pages/nanny/NanniesPage"));
const FavoritesPage = React.lazy(() => import("./pages/favorites/Favorites"));
const RequestResetPage = React.lazy(
  () => import("./pages/password/RequestResetPage")
);
const ResetPasswordPage = React.lazy(
  () => import("./pages/password/ResetPasswordPage")
);
const ProfilePage = React.lazy(() => import("./pages/profile/Profile"));
const PrivateRoute = React.lazy(
  () => import("./components/routers/PrivateRoute")
);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshSession())
        .unwrap()
        .then(() => dispatch(fetchMyNannyProfile()))
        .catch((error) => console.error("Session refresh failed:", error));
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nannies" element={<NanniesPage />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute component={<FavoritesPage />} redirectTo="/" />
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute component={<ProfilePage />} redirectTo="/" />
              }
            />
            <Route path="/request-reset" element={<RequestResetPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </Suspense>
      </main>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
    </Router>
  );
};

export default App;
