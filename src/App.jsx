import React from 'react'
import Createuser from './firebasecode/Createuser'
import Signupwithexitingemail from './firebasecode/Signupwithexitingemail'
import Profile from './firebasecode/Profiledashborad'

function App() {
  return (
    <>
    <Createuser/>
    <Signupwithexitingemail/>
    <Profile/>
    </>
  )
}

export default App