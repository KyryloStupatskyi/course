import { Button, Input, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { reserve } from "../http/ticketApi";
import { KINO_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { sentEmail } from "../http/gmailApi";
import '../styles/css/Payment.css'
import '../styles/media/Paymanet.css'

const Payment = observer(() => {
  const location = useLocation()
  const navigate = useNavigate()

  const { price, hallId } = location.state || {}
  const { cinema } = useContext(Context)
  const { user } = useContext(Context)
  const { movie } = useContext(Context)


  const [cardNumber, setCardNumber] = useState("");
  const [month, setExpiryMonth] = useState("");
  const [year, setExpiryYear] = useState("");
  const [cvv, setSvv] = useState("")

  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    setSelectedDate(movie.date)
  }, [movie._selectedDate])

  const cardNumberInput = (event) => {
    const removeLetters = event.target.value.replace(/\D/g, "");
    const sliceCountOfNumber = removeLetters.slice(0, 16);
    const addDef = sliceCountOfNumber.replace(/(\d{4})(?=\d)/g, "$1-");

    setCardNumber(addDef);
  };

  const monthHandler = (event) => {
    const month = event.target.value.replace(/\D/g, "").slice(0, 2);
    setExpiryMonth(month);
  };

  const yearHandler = (event) => {
    const year = event.target.value.replace(/\D/g, "").slice(0, 4);
    setExpiryYear(year);
  };

  const cvvHandler = (event) => {
    const cvv = event.target.value.replace(/\D/g, "").slice(0, 3);
    setSvv(cvv)
  }

  const reserveFunc = async () => {
    if (!user._user.id) return navigate(LOGIN_ROUTE)

    const yearNow = new Date().getFullYear()

    if (+year < yearNow) {
      return alert("Error entering date, check it and try again")
    }

    if (+month < 0 || +month > 12) {
      return alert("Error entering date, check it and try again")
    }

    if (cardNumber.length !== 19) {
      return alert("Card number should contained 16 numbers")
    }

    if (cvv.length !== 3) {
      return alert("cvv code should contained 3 numbers")
    }

    await reserve(movie.time, user._user.id, cinema.selectedCinema.cinemaId, hallId, cinema._selectedSeats, selectedDate.replace('.', '-'))
    sentEmail(user._user.email, user._user.username, cinema._selectedSeats, movie.time, selectedDate.replace('.', '-'))
    navigate(KINO_ROUTE)
    cinema.clearSelectedSeats()
  }

  return (
    <div className="payment-container">
      <Typography variant="h6" sx={{ textAlign: 'center' }}>Payment</Typography>
      <Typography sx={{ mt: 3 }}>Total price: {price}</Typography>

      <div className="payment-wrapper">
        <div className="left-side">
          <div className="card-num">
            <Typography>Enter card number</Typography>
            <Input value={cardNumber} onChange={cardNumberInput} placeholder="XXXX-XXXX-XXXX-XXXX" />
          </div>

          <div className="expirein">
            <Typography sx={{ textAlign: 'center' }}>Enter card expiry date</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: "20px" }}>
              <Input value={month} onChange={monthHandler} placeholder="MM" />
              <Input value={year} onChange={yearHandler} placeholder="YYYY" />
            </div>
          </div>
        </div>

        <div style={{ padding: '10px', textAlign: 'center' }}>
          <Typography>Put "cvv" kod</Typography>
          <Input placeholder="123" value={cvv} onChange={cvvHandler} />
        </div>
      </div>

      <Button variant="contained" sx={{ mt: 4 }} onClick={reserveFunc}>Pay</Button>
    </div >
  )
})
export default Payment