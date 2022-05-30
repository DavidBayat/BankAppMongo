import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';


const App = () => {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/User/:id" element={<DetailPage />} />
            </Routes>
    </Router>
  )
}

export default App