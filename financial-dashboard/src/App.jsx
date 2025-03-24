import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Crypto from "./pages/Crypto";

const App = () => {
  return (
<Router>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/stocks" element={<Stock/>}/>
    <Route path="/crypto" element={<Crypto/>}/>
  </Routes>
</Router>
  )
    
};

export default App;
