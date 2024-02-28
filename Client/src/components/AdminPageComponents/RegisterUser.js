import { Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { registerAdmin } from "../../http/adminApi";

const RegisterUser = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()
  const [role, setRole] = useState("ADMIN")

  const addNewAdminUser = async () => {
    await registerAdmin(email, password, username, role).then(data => {
      setEmail('')
      setPassword('')
      setUsername('')

      alert("User admin successfuly added")
    })
  }
  return (
    <div>
      <Typography sx={{ fontFamily: "Open Sans,sans-serif", fontWeight: 700, fontSize: 25, lineHeight: "32px !important", mb: 4 }}>Add Cinema Item</Typography>

      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Typography>Put candidate email</Typography>
          <Input placeholder="qwerty@gmail.com" fullWidth type="text" onChange={event => setEmail(event.target.value)} value={email} />
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Typography>Put candidate password</Typography>
          <Input placeholder="1234" fullWidth type="password" onChange={event => setPassword(event.target.value)} value={password} />
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Typography>Put candidate username</Typography>
          <Input placeholder="Bartek" fullWidth onChange={event => setUsername(event.target.value)} value={username} />
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Typography>Candidate role</Typography>
          <Input placeholder="1234" fullWidth value={role} disabled />
        </div>
      </div>

      <Button variant="contained" sx={{ mt: 4 }} onClick={addNewAdminUser}>Register new Admin</Button>
    </div>
  )
}
export default RegisterUser