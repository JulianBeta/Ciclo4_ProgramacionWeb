import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import GroupIcon from '@mui/icons-material/Group'
import ArchiveIcon from '@mui/icons-material/Archive'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({ left: false })
  const leftAnchor = 'left'
  const menuItems = [
    {
      destination: 'Home',
      id: 1,
      path: '/home',
      icon: <HomeIcon />,
      hasAccess: ['Student', 'etc...'],
    },
    {
      destination: 'Update Info',
      id: 2,
      path: '/home/updateUserInfo',
      icon: <AssignmentIndIcon />,
    },
    {
      destination: 'New Project',
      id: 3,
      path: '/home/projects/create',
      icon: <CreateNewFolderIcon />,
    },
    {
      destination: 'My Projects',
      id: 7,
      path: '/home/projects/myProjects',
      icon: <ArchiveIcon />,
    },
    {
      destination: 'List Users',
      id: 4,
      path: '/home/users/listAll',
      icon: <GroupIcon />,
    },
    {
      destination: 'List Projects',
      id: 5,
      path: '/home/projects/listProjects',
      icon: <AutoStoriesIcon />,
    },
    {
      destination: 'List Students',
      id: 6,
      path: '/home/users/listStudents',
      icon: <InsertEmoticonIcon />,
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
              <ListItemIcon>{route.icon}</ListItemIcon>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
