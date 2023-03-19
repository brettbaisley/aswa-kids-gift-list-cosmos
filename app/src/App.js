import { Routes, Route } from "react-router-dom";
import LoginPage  from "./pages/Login";
import HomePage  from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
