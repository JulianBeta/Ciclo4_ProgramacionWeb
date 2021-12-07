import LogoutButton from './LogoutButton'
import RegisteredUsers from './RegisteredUsers'
import UpdateUserInfo from './UpdateUserInfo'

const Home = () => {
  return (
    <div>
      <UpdateUserInfo />
      <RegisteredUsers />
      <LogoutButton />
    </div>
  )
}

export default Home
