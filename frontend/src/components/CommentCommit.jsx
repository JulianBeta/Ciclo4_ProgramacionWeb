import { Box, Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const CommentCommit = ({ project, comment, setComment, commit, setIsVisible }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const endPoint = 'http://localhost:8000/project/commentCommit'
      const payload = {
        observations: comment,
        _id: project._id,
        commitID: commit._id,
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
        setIsVisible(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TextField label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button type='submit'>
          <SendIcon />
        </Button>
      </Box>
    </form>
  )
}

export default CommentCommit
