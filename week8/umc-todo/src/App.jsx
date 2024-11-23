import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AllTodos from "./pages/AllTodos";
import TodoDetail from "./pages/TodoDetail";
import SearchTodos from "./pages/SearchTodos";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <AllTodos/>
      },
      {
        path: 'search',
        element: <SearchTodos/>
      },
      {
        path: ':todoId',
        element: <TodoDetail/>
      },
    ]
  }
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  )}

export default App;