import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search.jsx'
import Home from "./Pages/Home.jsx"
import { Route, Routes } from 'react-router-dom'
import SchoolList from './Pages/SchoolList.jsx'
import SchoolDetail from './Pages/SchoolDetail.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/SchoolList' element={<SchoolList />} />
        <Route path="school/:code" element={<SchoolDetail />} />
     </Routes>
    </>
  )
}

export default App
