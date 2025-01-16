import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { refreshSession } from "./redux/auth/operations";
import { selectIsLoading } from "./redux/auth/selectors";
import HomePage from "./pages/home/HomePage";
import NanniesPage from "./pages/nanny/NanniesPage";
import { AppDispatch } from "./redux/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(refreshSession()).catch(() => {
        localStorage.clear();
      });
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
        </Routes>
      </main>
    </Router>
  );
};

export default App;
