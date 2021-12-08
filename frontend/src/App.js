import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/pages/WelcomePage'
import Home from './components/pages/HomePage'
import EditUserProps from './components/EditUserProps'
import UpdateUserInfo from './components/UpdateUserInfo'
import ListAllUsers from './components/ListAllUsers'
import ProjectInfo from './components/ProjectInfo'
import EditProject from './components/EditProject'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/listAllUsers' element={<ListAllUsers />} />
        <Route path='/updateUserInfo' element={<UpdateUserInfo />} />
        <Route path='/edit/:id' element={<EditUserProps />} />
        <Route path='/projectInfo/:id' element={<ProjectInfo />} />
        <Route path='/editProject/:id' element={<EditProject />} />
      </Routes>
    </Router>
  )
}

export default App
