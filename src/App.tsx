import { Routes, Route, BrowserRouter } from "react-router-dom";

// Components
import Home from "./components/Home";
import List from "./components/List";
import Login from "./components/Login";
import NotFoundPage from "./components/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./components/Todo";

export default function App() {
  return (
    <main id="main">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="todo" element={<Todo />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="list"
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}
