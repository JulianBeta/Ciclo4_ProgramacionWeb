// set an state with the user info after login
import { createContext, useState } from 'react'

export const GlobalContext = createContext(null)

const GlobalContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  return <GlobalContext.Provider value={{ currentUser, setCurrentUser }}>{children}</GlobalContext.Provider>
}

export default GlobalContextProvider
