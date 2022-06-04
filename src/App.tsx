import { Navbar } from "./components/core/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./app.css";

export const App = () => {
  return (
    <Router>
      <Navbar />
    </Router>
  );
};
