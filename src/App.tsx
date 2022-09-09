import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import {MainContent,Topbar,Sidebar,Fodter} from './containers/'
import Report from './pages/report/Report'

function App() {
  

  return (
    <BrowserRouter>
      
      <Topbar/>
      
      <div style={{display:'flex',flexDirection:'column',width:'100%',height:'calc(100vh - 80px)'}}>

        <div style={{display:'flex',flex:'1'}}>
          <Sidebar/>
          <Routes>
            <Route path='/' element={<MainContent/>}>
                <Route path='report' element={<Report/>} />
            </Route>
          </Routes>
        </div>
        
        <Fodter/>
      </div>
    </BrowserRouter>
  )
}

export default App
