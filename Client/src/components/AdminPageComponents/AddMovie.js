import { Button, Input, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createMovie } from "../../http/adminApi";
import { getGenres } from "../../http/genreApi";
import CloseIcon from '@mui/icons-material/Close';

const AddMovie = () => {
  const [genres, setGenres] = useState()

  const [selectedGenre, setSelectedGenre] = useState(1)
  const [name, setName] = useState('')
  const [img, setImg] = useState(null)
  const [info, setInfo] = useState([])

  const [loading, setLoading] = useState(false)


  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
  }

  const selectFile = e => {
    setImg(e.target.files[0])
  }

  useEffect(() => {
    getGenres().then(data => {
      setGenres(data)
      setLoading(true)
    })
  }, [])


  const sendDataMovie = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('img', img)
    formData.append('genreId', +selectedGenre)
    formData.append('info', JSON.stringify(info))

    await createMovie(formData)
    alert("Movie successfuly added")
    setName('')
    setImg(null)
    setInfo([])
  }

  if (!loading) {
    return null;
  }

  return (
    <div>
      <Typography sx={{ fontFamily: "Open Sans,sans-serif", fontWeight: 700, fontSize: 25, lineHeight: "32px !important", mb: 4 }}>Add new Movie</Typography>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Put movie name</Typography>
        <Input placeholder="Klub Cudownych Kobiet" value={name} fullWidth onChange={event => setName(event.target.value)} />
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Choose movie genre</Typography>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-select-currency" select fullWidth sx={{ '& .MuiInputBase-input': { fontSize: 15 } }} value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} >
            {genres ? genres.map(({ id, name }) => (
              <MenuItem key={id} value={id} sx={{ fontSize: 14 }}>
                {name}
              </MenuItem>
            )) :
              (
                <MenuItem value="" sx={{ fontSize: 14 }}>
                  No genres available
                </MenuItem>
              )}
          </TextField>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Put movie image file</Typography>
        <Input type="file" fullWidth onChange={selectFile} />
      </div>

      <div style={{ marginTop: 20, width: '100%' }}>
        {info.map(item => (
          <div key={item.number} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, width: "100%", marginBottom: 10, padding: 10 }}>
            <div style={{ width: '60%' }}>
              <Typography>Put info title</Typography>
              <Input fullWidth placeholder="Year" onChange={(e) => changeInfo('title', e.target.value, item.number)} />
            </div>
            <div style={{ width: '60%' }}>
              <Typography>Put info description</Typography>
              <Input fullWidth placeholder="2014" onChange={(e) => changeInfo('description', e.target.value, item.number)} />
            </div>
            <Button onClick={() => removeInfo(item.number)}>
              <CloseIcon sx={{ color: 'gray' }} />
            </Button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <Button variant="contained" sx={{ mt: 4 }} onClick={addInfo}>Add new info field</Button>
        <Button variant="contained" sx={{ mt: 4 }} onClick={sendDataMovie}>Add new Movie</Button>
      </div>
    </div>
  )
}
export default AddMovie