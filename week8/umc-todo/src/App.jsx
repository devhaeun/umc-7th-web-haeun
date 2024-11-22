import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AllTodos from "./pages/AllTodos";
import TodoDetail from "./pages/TodoDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <AllTodos/>
      },
      {
        path: '/:todoId',
        element: <TodoDetail/>
      },
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )}

export default App;