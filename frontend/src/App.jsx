import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl='http://localhost:3000'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>

    
    </Routes>
  
  )
}

export default App
