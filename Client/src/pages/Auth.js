import { Button, Card, TextField, Typography } from "@mui/material"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { KINO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { login, registration } from "../http/userApi"
import '../styles/css/Auth.css'
import '../styles/media/Auth.css'

const Auth = observer(() => {
  const location = useLocation().pathname
  const isLogin = location === LOGIN_ROUTE
  const navigate = useNavigate()

  const { user } = useContext(Context)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password, username)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(KINO_ROUTE)
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div>
          <Typography className="card-title">{isLogin ? 'Login' : 'Registration'}</Typography>

          <div style={{ marginTop: '10%' }} >
            <TextField id="email" onChange={e => setEmail(e.target.value)} placeholder="Type your email.." fullWidth type="email" required />
            <TextField id="pass" onChange={e => setPassword(e.target.value)} placeholder="Type your password.." fullWidth type="password" sx={{ mt: 3 }} required />
            {isLogin ? '' : <TextField id="pass" onChange={e => setUsername(e.target.value)} placeholder="Imagine your username.." fullWidth sx={{ mt: 3 }} />}
          </div>

          <Typography className="change-btn--title">
            {isLogin ?
              <>
                Don`t have an account?
                <NavLink to={REGISTRATION_ROUTE}>
                  <Button variant="contained" sx={{ bgcolor: '#A8C7FA', ml: 3 }}>
                    Register!
                  </Button>
                </NavLink>
              </>
              :
              <>
                Already have account? <NavLink to={LOGIN_ROUTE}><Button variant="contained" sx={{ bgcolor: '#A8C7FA', ml: 3 }}>Login!</Button></NavLink>
              </>
            }
          </Typography>
        </div>

        <Button variant="contained" className="accept-btn" sx={{}} onClick={click}>
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </Card>
    </div >
  )
})
export default Auth