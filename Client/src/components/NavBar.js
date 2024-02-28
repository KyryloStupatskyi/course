import React, { useContext, useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Container } from "@mui/material";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, KINO_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
  const { user } = useContext(Context)
  useEffect(() => {

  }, [user._user, user._isAuth])
  const navigate = useNavigate()

  const logout = () => {
    user.setIsAuth(false)
    navigate(LOGIN_ROUTE)
  }

  return (
    <Box sx={{ flexGrow: 1, width: "100vw !important" }}>
      <AppBar position="static" sx={{ backgroundColor: "#424242" }}>
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate(KINO_ROUTE)}>
              Super Kino
            </Typography>
            {user._isAuth === true ?
              <>
                {user._user.role === "ADMIN" ?
                  <Button color="inherit" onClick={() => navigate(ADMIN_ROUTE)}>Admin Menu</Button>
                  : <></>}
                <Button color="inherit" onClick={logout}>LogOut</Button>
              </>
              :
              <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>}
          </Toolbar>
        </Container>
      </AppBar>
    </Box >
  )
})
export default NavBar