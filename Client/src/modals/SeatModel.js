import { Box, Button, Card, Modal, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { getMovieById } from "../http/movieApi";
import { observer } from "mobx-react-lite";
import { getHall } from "../http/hallApi";
import { getSeats } from "../http/seatsApi";
import { useNavigate, useParams } from "react-router-dom";
import { BILET_PRICE, LOGIN_ROUTE, PAYMENT_ROUTE } from "../utils/consts";
import InfoItem from "../components/InfoItem";
import '../styles/css/SeatModel.css'
import '../styles/media/SeatModel.css'

const SeatModel = observer(({ handleClose, open, price, setPrice }) => {
  const { cinema } = useContext(Context)
  const { user } = useContext(Context)
  const movieStore = useContext(Context).movie

  const [movie, setMovie] = useState(null)
  const [hall, setHall] = useState()
  const [seats, setSeats] = useState()


  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (movieStore.time && movieStore.date) {
      getHall(id, movieStore.time).then(data => {
        setHall(data);

        if (data && data.cinemaId) {
          getSeats(data.cinemaId, data.id, movieStore.time, movieStore._selectedDate).then(data => {
            setSeats(data);
          });
        }
      });
    }

    getMovieById(id).then(data => {
      console.log(data)
      setMovie(data)
      setLoading(true)
    })
  }, [id, cinema._selectedSeats, movieStore.time, movieStore.date])


  if (!loading) {
    return null;
  }

  const handleClick = (item) => {
    const seatIds = cinema._selectedSeats.map(seat => seat.id);

    if (seatIds.includes(item.id)) {
      cinema.removeSelectedSeat(item);
      setPrice(prevState => prevState - BILET_PRICE)
    } else if (cinema._selectedSeats.length < 5) {
      cinema.setSelectedSeats(item);
      setPrice(prevState => prevState + BILET_PRICE)
    }
  };

  const pressBtn = () => {
    if (!user._user.id) {
      alert('You need to be log in, try again!')
      cinema.clearSelectedSeats()
      return navigate(LOGIN_ROUTE)
    }

    return navigate(PAYMENT_ROUTE, { state: { price, hallId: hall.id } })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="box">
        <div className="seatModal--title">
          <ul className="seat-Modal--list">
            <li ><Typography className="seat-Modal--list-item">{movie.name}</Typography></li>
          </ul>
        </div>

        <div className="seatModal-container">
          <div className="left-side">
            <div className="seatBox">
              <Typography sx={{ mb: 3 }}>Ekran</Typography>
              <div className="grid-tmp">
                {seats?.map((item) => (
                  item.isAvailable ?
                    <div className={`seatItem ${cinema._selectedSeats.map(seat => seat.id).includes(item.id) ? "selectedSeat" : ""}`} key={item.id} onClick={() => handleClick(item)}>
                      <span className="seatNumber">{item.nubmer}</span>
                    </div>
                    :
                    <div className="disabled" key={item.id}>
                      <span className="seatNumber">{item.nubmer}</span>
                    </div>
                ))}
              </div>
            </div>

            <Card className="card-info">
              <InfoItem className="seatItem" title="- Bilet zwykły 24.90zł." />
              <InfoItem className="infoSelected" title="- Selected seat" />
              <InfoItem className="disabled" title="- Reserved seat" />
            </Card>
          </div>

          <div className="right-side">
            <div className="content-container">
              <div style={{ height: '100%' }}>
                {
                  cinema.selectedSeats.map(({ id, nubmer }) =>
                    <Card key={id} className="card-info-item">
                      <Typography>{nubmer}</Typography>
                    </Card>
                  )
                }
              </div>

              <div className="sum-container">
                <Typography className="sum-title">Summary:</Typography>
                <Typography className="sum-title">{Math.abs(price.toFixed(3))}zl.</Typography>
              </div>
            </div>

            <Button className="btn" variant="outlined" onClick={pressBtn}>Go to Payment</Button>
          </div>
        </div>
      </Box >
    </Modal>
  )
})

export default SeatModel