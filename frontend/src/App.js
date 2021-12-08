import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/pages/WelcomePage'
import Home from './components/pages/HomePage'
import EditUserProps from './components/EditUserProps'
import UpdateUserInfo from './components/UpdateUserInfo'
import ListAllUsers from './components/ListAllUsers'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/listAllUsers' element={<ListAllUsers />} />
        <Route path='/updateUserInfo' element={<UpdateUserInfo />} />
        <Route path='/edit/:id' element={<EditUserProps />} />
      </Routes>
    </Router>
  )
}

export default App
