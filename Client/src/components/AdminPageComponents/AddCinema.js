import { Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { addCinema } from "../../http/adminApi";

import '../../styles/css/AdminPage.css'
import '../../styles/media/AdminPage.css'

const AddCinema = () => {
  const [name, setName] = useState('')
  const [adress, setAdress] = useState('')
  const [capacity, setCapacity] = useState()
  const [city, setCity] = useState('')

  const sendData = async () => {
    if (await addCinema(name, adress, +capacity, city)) {
      setName('')
      setAdress('')
      setCapacity('')
      setCity('')

      alert("Cinema was successfuly created")
    }
  }
  return (
    <div style={{ width: '100%', padding: "5px" }}>
      <Typography sx={{
        fontFamily: "Open Sans,sans-serif", fontWeight: 700, fontSize: 25, lineHeight: "32px !important", mb: 4
      }}>Add Cinema Item</Typography>

      <div className="cinema-info">
        <div className="cinema-info--item">
          <Typography>Put cinema name</Typography>
          <Input placeholder="Super Kino" onChange={event => setName(event.target.value)} value={name} fullWidth />
        </div>
        <div className="cinema-info--item">
          <Typography>Put cinema adress</Typography>
          <Input placeholder="ul. Gospodarcza 28" onChange={event => setAdress(event.target.value)} value={adress} fullWidth />
        </div>
      </div>

      <div style={{ marginTop: "40px", display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Put cinema capacity</Typography>
        <Input className="calc-width" placeholder="130" onChange={event => setCapacity(event.target.value)} type="number" value={capacity} />
      </div>

      <div style={{ marginTop: "40px", display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Put cinema city</Typography>
        <Input className="calc-width" placeholder="Warszawa" onChange={event => setCity(event.target.value)} value={city} />
      </div>

      <Button variant="contained" sx={{ mt: 4 }} onClick={sendData}>Add cinema</Button>
    </div >
  )
}
export default AddCinema