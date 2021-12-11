import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ListRequests = ({ p, handleClick }) => {
  const pending = 'Pending'
  return (
    <>
      <ListItem
        key={p._id}
        secondaryAction={
          <IconButton onClick={() => handleClick(p)} edge='end'>
            {p.status === pending ? <AddIcon /> : <RemoveIcon />}
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          {p.user.email} is {p.status}
        </ListItemText>
      </ListItem>
    </>
  )
}

export default ListRequests
