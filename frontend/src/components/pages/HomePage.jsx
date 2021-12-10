import { Outlet } from 'react-router-dom'
import CreateProject from '../CreateProject'
import TemporaryDrawer from '../DrawerUI'

const Home = () => {
  return (
    <div>
      <TemporaryDrawer />
      <CreateProject />
      <Outlet />
    </div>
  )
}

export default Home
