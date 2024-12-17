import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Category from "./pages/movies/Category";
import NowPlaying from "./pages/movies/NowPlaying";
import Popular from "./pages/movies/Popular";
import TopRated from "./pages/movies/TopRated";
import UpComing from "./pages/movies/UpComing";
import MovieDetail from "./pages/movies/MovieDetail";

const router = createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'movies',
        element: <Category />
      },
      {
        path: 'movies/now-playing',
        element: <NowPlaying />
      },
      {
        path: 'movies/popular',
        element: <Popular />
      },
      {
        path: 'movies/top-rated',
        element: <TopRated />
      },
      {
        path: 'movies/up-coming',
        element: <UpComing />
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetail />
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App
