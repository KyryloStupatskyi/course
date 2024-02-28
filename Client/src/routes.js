import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Kino from "./pages/Kino"
import MovieItem from "./pages/MovieItem"
import Payment from "./pages/Payment"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, KINO_ROUTE, ADMIN_ROUTE, MOVIE_ROUTE, PAYMENT_ROUTE } from "./utils/consts"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },

  {
    path: PAYMENT_ROUTE,
    Component: Payment
  }
]

export const publicRoutes = [
  {
    path: KINO_ROUTE,
    Component: Kino
  },

  {
    path: LOGIN_ROUTE,
    Component: Auth
  },

  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },

  {
    path: MOVIE_ROUTE + '/:id',
    Component: MovieItem
  }
]