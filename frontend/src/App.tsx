import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NanniesPage from "./pages/nanny/NanniesPage";

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />

          {/* Сторінка Нянь */}
          <Route path="/nannies" element={<NanniesPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
