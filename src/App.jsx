import React from 'react'
import Createuser from './firebasecode/Createuser'
import Signupwithexitingemail from './firebasecode/Signupwithexitingemail'
import Profile from './firebasecode/Profiledashborad'
import Continuswithgoogle from './Continuswithgoogle'
import './App.css'

function App() {
  return (
    <>
    <Createuser/>
    <Signupwithexitingemail/>
    <Profile/>
    <Continuswithgoogle/>
    </>
  )
}

export default App