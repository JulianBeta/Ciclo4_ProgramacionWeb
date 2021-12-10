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
import GeneralProtected from './routes/GeneralProtected'
import CreateProject from './components/CreateProject'
import MyProjects from './components/MyProjects'
import EditMyProject from './components/EditMyProject'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route element={<GeneralProtected />}>
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
                <Route path='create' element={<CreateProject />} />
                <Route path='myProjects' element={<MyProjects />} />
                <Route path='editMy/:id' element={<EditMyProject />} />
              </Route>
              <Route path='manage'>
                {/* render list of students  */}
                <Route path='students' />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
