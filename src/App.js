import React from 'react'
import Navbar from './component/navbar/Navbar'
import MainRoute from './routes/route'
import BackToTop from './component/back-to-top/BackToTop';
import { UserAuthContextProvider } from './context/UserAuthContext';

export default function App() {

  return (
      <UserAuthContextProvider>
        {/* <Navbar /> */}
        <MainRoute />
        <BackToTop />
      </UserAuthContextProvider>
  )
}
