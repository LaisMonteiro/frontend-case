import { Routes, Route, BrowserRouter } from "react-router-dom";

// Components
import Home from "./components/Home";
import List from "./components/List";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./components/Todo";

export default function App() {
  return (
    <main id="main">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route
              path="list"
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="todo" element={<Todo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}
