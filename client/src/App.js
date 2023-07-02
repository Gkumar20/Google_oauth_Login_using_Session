
import './App.css';
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

const App = () => {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>

    </>
  )
}

export default App