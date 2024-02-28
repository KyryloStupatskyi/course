import { Route, Routes, Navigate } from "react-router-dom"
import { authRoutes, publicRoutes } from "../routes"
import { useContext } from "react"
import { Context } from ".."
import { observer } from "mobx-react-lite"

const AppRouter = observer(() => {
  const { user } = useContext(Context)
  return (
    <Routes>
      {user._isAuth && authRoutes.map(({ path, Component }) =>
        <Route path={path} Component={Component} key={path} />
      )}

      {publicRoutes.map(({ path, Component }) =>
        <Route path={path} Component={Component} key={path} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
})
export default AppRouter