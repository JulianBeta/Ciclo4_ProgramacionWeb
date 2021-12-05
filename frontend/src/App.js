import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import Home from './components/Home'

const App = () => {
  const { currentUser } = useContext(GlobalContext)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
