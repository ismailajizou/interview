import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import ProtectedLayout from "./layouts/protected.layout";
import HomePage from "./pages/home";
import DocEditor from "./pages/doc-editor";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Add routes here */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/documents/:id" element={<DocEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
