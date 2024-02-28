import { Button, Input, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllCinemas } from "../../http/cinemaApi";
import { addHall } from "../../http/adminApi";

const AddHall = () => {
  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState('')
  const [cinemas, setCinemas] = useState()
  const [selectedValue, setSelectedValue] = useState(1);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllCinemas().then(data => {
      setCinemas(data)
      setLoading(true)
    })
  }, [])

  const sendData = async () => {
    await addHall(name, +capacity, selectedValue).then(data => {
      setSelectedValue(1)
      setName('')
      setCapacity('')

      alert("Hall was successfuly created")
    })
  }

  if (!loading) {
    return null;
  }

  return (
    <div>
      <Typography sx={{ fontFamily: "Open Sans,sans-serif", fontWeight: 700, fontSize: 25, lineHeight: "32px !important", mb: 4 }}>Add Cinema Hall</Typography>

      <div style={{ display: 'flex', gap: "10%", alignContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 25, marginBottom: '20px', width: '40%' }}>
          <Typography>Put hall index name</Typography>
          <Input placeholder="A3B" fullWidth onChange={event => setName(event.target.value)} value={name} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
          <Typography>Choose cinema, which belongs to this hall</Typography>
          <TextField id="outlined-select-currency" select fullWidth sx={{ marginTop: "20px", '& .MuiInputBase-input': { fontSize: 15 } }} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} >
            {cinemas.map(({ id, name, adress, capacity, city }) => (
              <MenuItem key={id} value={id} sx={{ fontSize: 14 }}>
                {name} - {adress} - {city}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '40px' }}>
        <Typography>Put hall capacity</Typography>
        <Input placeholder="40" fullWidth onChange={event => setCapacity(event.target.value)} value={capacity} />
      </div>

      <Button variant="contained" sx={{ mt: 4 }} onClick={sendData}>Add Hall</Button>
    </div>
  )
}
export default AddHall