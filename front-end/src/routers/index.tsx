import { Navigate, createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home";
import { ErrorPage } from "../pages/error";
import { Album } from "../pages/album";
import { Anniversary } from "../pages/anniversary";
import { Message } from "../pages/message";
import { Todo } from "../pages/todo";
import { Photo, loader as PhotoLoader } from "../pages/photo";
export const rootRouter = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "album",
        element: <Album />,
      },
      {
        path: "album/:albumId",
        element: <Photo />,
        loader: PhotoLoader,
      },
      {
        path: "anniversary",
        element: <Anniversary />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "todo",
        element: <Todo />,
      },
    ],
  },
]);
