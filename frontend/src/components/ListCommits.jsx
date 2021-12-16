import { ListItem, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import CommentCommit from './CommentCommit'

const ListCommits = ({ commit, project }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [comment, setComment] = useState(commit.observations)

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
          {commit.observations && (
            <Box sx={{ mt: 3, borderTop: 'grey 1px solid' }}>
              <Typography>Leader: {comment || commit.observations}</Typography>
            </Box>
          )}
        </ListItemText>
      </ListItem>
      {currentUser.email === project.author && isVisible && (
        <CommentCommit
          project={project}
          comment={comment}
          setComment={setComment}
          commit={commit}
          setIsVisible={setIsVisible}
        />
      )}
    </>
  )
}

export default ListCommits
