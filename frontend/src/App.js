import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import Home from './components/Home'
import EditUserStatus from './components/EditUserStatus'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/edit/:id' element={<EditUserStatus />} />
      </Routes>
    </Router>
  )
}

export default App
