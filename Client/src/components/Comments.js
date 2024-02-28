import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { commentPost, getComment } from "../http/commentApi";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/css/Comments.css'
import '../styles/media/Comments.css'

const Comments = observer(() => {
  const [data, setData] = useState('')
  const [comment, setComment] = useState()
  const { user } = useContext(Context)
  const { id } = useParams()
  const navigate = useNavigate()


  const AddComment = async () => {
    if (!user._user.id) {
      navigate(LOGIN_ROUTE)
      return alert('Comments just for auth users')
    }

    await commentPost(data, user._user.id, id)

    getComment(id).then(data => setComment(data));
    alert("Comments just add")
  }

  useEffect(() => {
    getComment(id).then(data => setComment(data))
  }, [id])

  return (
    <div className="comments-container">
      <Typography className="comments-title">Comments</Typography>

      <div>
        <TextField label="Print your own opinion about this film here.." color="info" multiline rows={4} margin="normal" fullWidth sx={{ height: "100px" }} onChange={event => setData(event.target.value)} />
        <Button fullWidth variant="contained" sx={{ mt: 4 }} onClick={AddComment}>Add a comment</Button>
      </div>

      <div className="comments-list">
        {comment && comment.map(({ id, comment, user }) => (
          <div key={id} className="comment-item--container">
            <div className="comment-item">
              <AccountCircleIcon />
              <Typography className="comment-username">{user.username}</Typography>
            </div>
            <Typography className="comment-item">{comment}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
})
export default Comments