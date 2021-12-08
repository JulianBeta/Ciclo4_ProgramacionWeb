import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({ left: false })
  const leftAnchor = 'left'
  // map through this array as items
  const menuItems = [
    {
      destination: 'Home',
      id: 1,
      path: '/home',
      icon: '',
      hasAccess: ['Student', 'etc...'],
    },
    {
      destination: 'Update Info',
      id: 2,
      path: '/updateUserInfo',
      icon: '',
    },
    {
      destination: 'List Users',
      id: 3,
      path: '/listAllUsers',
      icon: '',
    },
    {
      destination: 'List Projects',
      id: 4,
      path: '/listProjects',
      icon: '',
    },
    {
      destination: 'List Students',
      id: 5,
      path: '/listStudents',
      icon: '',
    },
  ]
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box sx={{ width: 250 }} role='menu' onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {menuItems.map((route) => (
          <Link to={route.path} key={route.id}>
            <ListItem button>
              <ListItemText primary={route.destination} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={toggleDrawer(leftAnchor, true)}>Menu</Button>
          <LogoutButton />
        </Box>

        <Drawer anchor={leftAnchor} open={state[leftAnchor]} onClose={toggleDrawer(leftAnchor, false)}>
          {list(leftAnchor)}
        </Drawer>
      </>
    </div>
  )
}
