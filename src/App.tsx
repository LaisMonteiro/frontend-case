import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <main id="main">
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="list" element={<List />} />
            <Route path="login" element={<Login />} />
            <Route path="todo" element={<Todo />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
