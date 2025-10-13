import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Board from "./pages/Board";
import BoardLayout from "./layouts/BoardLayout";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="board" element={<BoardLayout />}>
          <Route index element={<Board />} />
          <Route path="add_task" element={<AddTask />} />
          <Route path="edit_task" element={<EditTask />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    ),
    {
      basename: "/Kanban_Project_React",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
