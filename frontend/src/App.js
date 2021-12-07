import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/pages/WelcomePage'
import Home from './components/pages/HomePage'
import EditUserStatus from './components/EditUserStatus'
import UpdateUserInfo from './components/UpdateUserInfo'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/edit/:id' element={<EditUserStatus />} />
        <Route path='/updateUserInfo' element={<UpdateUserInfo />} />
      </Routes>
    </Router>
  )
}

export default App
