import "regenerator-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" key={Math.random()} element={<Welcome />} />
        <Route path="/home" key={Math.random()} element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
