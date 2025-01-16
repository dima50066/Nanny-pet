import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
const App = () => {
  return (
    <Router>
      <main>
        {" "}
        <HomePage />
      </main>
    </Router>
  );
};

export default App;
