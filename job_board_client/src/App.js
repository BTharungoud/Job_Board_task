import './App.css';
import React from 'react';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { Careerpage } from './pages/Careerpage.js';
import { UserProfile } from './pages/UserProfile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/careers' element={<Careerpage/>} />
            <Route path='/user' element={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
