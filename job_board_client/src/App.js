import './App.css';
import React from 'react';
import {Routes,Route,BrowserRouter} from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { CareerPage } from './pages/CareerPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/careers' element={<CareerPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
