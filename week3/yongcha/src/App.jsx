import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import NowPlaying from './pages/movies/NowPlaying';
import Popular from './pages/movies/Popular';
import TopRated from './pages/movies/TopRated';
import UpComing from './pages/movies/UpComing';
import RootLayout from './layout/RootLayout';
import Category from './pages/movies/Category';
// import MovieDetail from './pages/movies/MovieDetail';
import MovieDetail2 from './pages/movies/MovieDetail2';
import { createContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

const queryClient = new QueryClient();

export const MyContext = createContext();

const router = createBrowserRouter([
  {
    path: '/',
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
        element: <MovieDetail2 />
      }
    ]
  }
])

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider value={VisibilityContext}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </QueryClientProvider>
  )
}

export default App
