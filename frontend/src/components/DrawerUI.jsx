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
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import BadgeIcon from '@mui/icons-material/Badge'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { GlobalContext } from '../context/GlobalContext'
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({ left: false })
  const leftAnchor = 'left'
  const { currentUser } = React.useContext(GlobalContext)
  const menuItems = [
    {
      destination: 'Home',
      id: 1,
      path: '/home',
      icon: <HomeIcon />,
      hasAccess: ['Student', 'Admin', 'Leader'],
    },
    {
      destination: 'Update Info',
      id: 2,
      path: '/home/updateUserInfo',
      icon: <AssignmentIndIcon />,
      hasAccess: ['Student', 'Admin', 'Leader'],
    },
    {
      destination: 'New Project',
      id: 3,
      path: '/home/projects/create',
      icon: <CreateNewFolderIcon />,
      hasAccess: ['Admin', 'Leader'],
    },
    {
      destination: 'My Projects',
      id: 4,
      path: '/home/projects/myProjects',
      icon: <ArchiveIcon />,
      hasAccess: ['Admin', 'Leader'],
    },
    {
      destination: 'List Users',
      id: 5,
      path: '/home/users/listAll',
      icon: <GroupIcon />,
      hasAccess: ['Admin', 'Leader'],
    },
    {
      destination: 'List Projects',
      id: 6,
      path: '/home/projects/listProjects',
      icon: <AutoStoriesIcon />,
      hasAccess: ['Student', 'Admin', 'Leader'],
    },
    {
      destination: 'Your Projects',
      id: 7,
      path: '/home/projects/studentProjects',
      icon: <AssignmentTurnedInIcon />,
      hasAccess: ['Student'],
    },
    {
      destination: 'List Students',
      id: 8,
      path: '/home/users/listStudents',
      icon: <InsertEmoticonIcon />,
      hasAccess: ['Admin', 'Leader'],
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
        <ListItem button>
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText secondary={currentUser.email} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map((route) => {
          const userHasAccess = route.hasAccess.includes(currentUser.rol)
          if (userHasAccess) {
            return (
              <Link to={route.path} key={route.id}>
                <ListItem button>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.destination} />
                </ListItem>
              </Link>
            )
          } else {
            return null
          }
        })}
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1 }}>
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
