// set an state with the user info after login
import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext(null)

const GlobalContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  return <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>{children}</GlobalContext.Provider>
}

export default GlobalContextProvider
