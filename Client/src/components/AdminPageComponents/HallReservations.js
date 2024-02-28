import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Input, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllCinemas } from "../../http/cinemaApi";
import { createReservation, getAllHallByCinemaId, getAllReservations } from "../../http/adminApi";
import { getAllMovie } from "../../http/movieApi";
import { observer } from "mobx-react-lite";

const HallReservations = observer(() => {
  const [allCinemas, setAllCinemas] = useState()
  const [allHallToCinemaId, setAllHallToCinemaId] = useState([{}])
  const [allMovies, setAllMovies] = useState([{}])

  const [selectedCinema, setSelectedCinema] = useState(0)
  const [selectedHall, setSelectedHall] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(0)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const [reservations, setReservations] = useState([])

  useEffect(() => {
    getAllCinemas().then(data => setAllCinemas(data))
    getAllMovie().then(data => setAllMovies(data))
  }, [])

  useEffect(() => {
    getAllHallByCinemaId(selectedCinema).then(data => setAllHallToCinemaId(data))
  }, [selectedCinema])

  useEffect(() => {
    getAllReservations(selectedHall).then(data => setReservations(data))
  }, [selectedHall, selectedDate])

  const click = async () => {
    const data = await createReservation(selectedTime, selectedMovie, selectedHall, selectedCinema, selectedDate.replace(".", '-'))

    if (data) {
      setSelectedCinema(0)
      setSelectedHall(0)
      setSelectedMovie(0)
      setSelectedTime(0)
      return alert("Reservation successfully added")
    }

    return alert("Something went wrong")
  }

  return (
    <div>
      <Typography sx={{ fontFamily: "Open Sans,sans-serif", fontWeight: 700, fontSize: 25, lineHeight: "32px !important", mb: 4 }}>Hall Reservation</Typography>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Select a CITY (the city for which you want to set a session)</Typography>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-select-currency" select fullWidth sx={{ '& .MuiInputBase-input': { fontSize: 15 } }} value={selectedCinema} onChange={(e) => setSelectedCinema(e.target.value)} >
            {allCinemas ? allCinemas.map(({ id, name, adress, city, capacity }) => (
              <MenuItem key={id} value={id} sx={{ fontSize: 14 }}>
                {city}, {adress}, {name} - {capacity} places
              </MenuItem>
            )) :
              (
                <MenuItem value="" sx={{ fontSize: 14 }}>
                  No cities available
                </MenuItem>
              )}
          </TextField>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Select a HALL (the hall for which you want to set a session)</Typography>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-select-currency" select fullWidth sx={{ '& .MuiInputBase-input': { fontSize: 15 } }} value={selectedHall} onChange={(e) => setSelectedHall(e.target.value)} >
            {allHallToCinemaId ? allHallToCinemaId.map(({ id, hallName, capacity }) => (
              <MenuItem key={id} value={id} sx={{ fontSize: 14 }}>
                {hallName} - {capacity} places
              </MenuItem>
            )) :
              (
                <MenuItem value="" sx={{ fontSize: 14 }}>
                  No halls available
                </MenuItem>
              )}
          </TextField>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Select a MOVIE (the movie for which you want to set a session)</Typography>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-select-currency" select fullWidth sx={{ '& .MuiInputBase-input': { fontSize: 15 } }} value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} >
            {allMovies ? allMovies.map(({ id, name }) => (
              <MenuItem key={id} value={id} sx={{ fontSize: 14 }}>
                {name}
              </MenuItem>
            )) :
              (
                <MenuItem value="" sx={{ fontSize: 14 }}>
                  No halls available
                </MenuItem>
              )}
          </TextField>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Check the list of reservers and put in the most appropriate time of the form 12:34:56</Typography>
        <Input fullWidth type="text" onChange={e => setSelectedTime(e.target.value)} value={selectedTime} />
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography>Check the list of reservers and put in the most appropriate time of the form 12:34:56</Typography>
        <Input fullWidth type="date" onChange={e => setSelectedDate(e.target.value)} value={selectedDate} />
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid red', borderBottom: '1px solid red', padding: "10px" }}>
        <Accordion>
          <AccordionSummary aria-controls="panel1-content" expandIcon={<ExpandMoreIcon />} id="panel1-header">
            Click here to check existed reservations!
          </AccordionSummary>

          <AccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {reservations && reservations.map(({ id, date, time }) => (
                  <TableRow>
                    <TableCell>{id}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </div>

      <div>
        <Button variant="contained" sx={{ mt: 4 }} onClick={click}>
          Create Reservation
        </Button>
      </div>
    </div>
  )
})
export default HallReservations