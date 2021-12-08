import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/pages/WelcomePage'
import Home from './components/pages/HomePage'
import EditUserProps from './components/EditUserProps'
import UpdateUserInfo from './components/UpdateUserInfo'
import ListAllUsers from './components/ListAllUsers'
import ProjectInfo from './components/ProjectInfo'
import EditProject from './components/EditProject'
import ListAllProjects from './components/ListAllProjects'
import ListStudents from './components/ListStudents'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/updateUserInfo' element={<UpdateUserInfo />} />
          <Route path='/listAllUsers' element={<ListAllUsers />} />
          {/* nest inside listAllUsers */}
          <Route path='/listStudents' element={<ListStudents />} />
          <Route path='/editUser/:id' element={<EditUserProps />} />
          <Route path='/listProjects' element={<ListAllProjects />} />
          {/* nest inside listProjects */}
          <Route path='/projectInfo/:id' element={<ProjectInfo />} />
          <Route path='/editProject/:id' element={<EditProject />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
