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
          <Route path='/home' element={<Home />}>
            <Route path='updateUserInfo' element={<UpdateUserInfo />} />
            <Route path='users'>
              <Route path='listAll' element={<ListAllUsers />} />
              <Route path='listStudents' element={<ListStudents />} />
              <Route path='editUser/:id' element={<EditUserProps />} />
            </Route>
            <Route path='projects'>
              <Route path='listProjects' element={<ListAllProjects />} />
              <Route path='projectInfo/:id' element={<ProjectInfo />} />
              <Route path='editProject/:id' element={<EditProject />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
