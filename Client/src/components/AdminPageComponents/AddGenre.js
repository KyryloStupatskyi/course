import { Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { addGenre } from "../../http/adminApi";

const AddGenre = () => {
  const [genre, setGenre] = useState()

  const click = async () => {
    try {
      const data = await addGenre(genre)

      if (data) {
        setGenre("")
        alert('Genre was successfully added')
      }
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div>
      <Typography sx={{
        fontFamily: "Open Sans,sans-serif", fontWeight: 700, fontSize: 25, lineHeight: "32px !important", mb: 4
      }}>Add new movie Genre</Typography>
      <div style={{ marginTop: "40px", display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Put new genre Name</Typography>
        <Input placeholder="Comedy" value={genre} onChange={event => setGenre(event.target.value)} />
      </div>

      <Button variant="contained" sx={{ mt: 4 }} onClick={click}>Add Genre</Button>
    </div>
  )
}
export default AddGenre