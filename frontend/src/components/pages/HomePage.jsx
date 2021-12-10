import { Outlet } from 'react-router-dom'
import TemporaryDrawer from '../DrawerUI'

const Home = () => {
  return (
    <div>
      <TemporaryDrawer />

      <Outlet />
    </div>
  )
}

export default Home
