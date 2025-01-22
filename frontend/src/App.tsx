import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { refreshSession } from "./redux/auth/operations";
import { selectIsLoading, selectToken } from "./redux/auth/selectors";
import HomePage from "./pages/home/HomePage";
import NanniesPage from "./pages/nanny/NanniesPage";
import FavoritesPage from "./pages/favorites/Favorites";
import PrivateRoute from "./components/routers/PrivateRoute";
import { AppDispatch } from "./redux/store";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(refreshSession());
    }
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute component={<FavoritesPage />} redirectTo="/" />
            }
          />
        </Routes>
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
