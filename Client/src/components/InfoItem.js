import { Typography } from "@mui/material";
import React from "react";

import '../styles/css/SeatModel.css'
import '../styles/media/SeatModel.css'

const InfoItem = ({ className, title }) => {
  return (
    <div className="info-item-container">
      <div className={className} />
      <Typography className="info-item-title">{title}</Typography>
    </div>
  )
}
export default InfoItem