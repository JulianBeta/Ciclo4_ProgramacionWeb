import { Button, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'

const CommentCommit = ({ project, user }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = async (e) => {
    //hit new endpoint and add comment
    e.preventDefault()
    try {
      const endPoint = 'http://localhost:8000/project/commit'
      const payload = {
        comment,
        _id: project._id,
        user: user._id,
      }
      const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data) {
        // navigate(-1)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form onSubmit={() => handleSubmit()}>
      <TextField label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button>
        <SendIcon />
      </Button>
    </form>
  )
}

export default CommentCommit
