import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllUsersPage from "./pages/users";
import UserById from "./pages/users/id";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<AllUsersPage />} />
        <Route path="/users/:id" element={<UserById />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
