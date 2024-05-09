import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from "./Home.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CalculatorPage from "./assets/calculator/Calculator.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>} />
              <Route path={"/calculator"} element={<CalculatorPage/>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
