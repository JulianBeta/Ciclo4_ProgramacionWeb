import { ListItem, ListItemText, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import CommentCommit from './CommentCommit'

const ListCommits = ({ commit, project }) => {
  const [isVisible, setIsVisible] = useState(false)

  const { currentUser } = useContext(GlobalContext)
  return (
    <>
      <ListItem onClick={() => setIsVisible(!isVisible)}>
        <ListItemText>
          <Typography sx={{ fontSize: 14 }} color='text.secondary'>
            {commit.user.email}
          </Typography>
          <Typography variant='h5'>{commit.commit.title}</Typography>
          <Typography>{commit.commit.content}</Typography>

          {/* render comments here */}
        </ListItemText>
      </ListItem>
      {currentUser.email === project.author && isVisible && <CommentCommit project={project} user={currentUser} />}
    </>
  )
}

export default ListCommits
