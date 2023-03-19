import { Routes, Route } from "react-router-dom";
import LoginPage  from "./pages/Login";
import HomePage  from "./pages/Home";
import AddPage from "./pages/AddGift";
import EditPage from "./pages/EditGift";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/add" element={<AddPage />} />
      <Route path="/admin/edit/:id" element={<EditPage />} />
    </Routes>
  );
}

export default App;
