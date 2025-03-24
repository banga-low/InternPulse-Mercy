import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";  
import StockCard from "../components/StockCard";
import PriceChart from "../components/PriceChart";

const Stock = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");

  return (
    <div>
      <Navbar />
      <Header onSearch={(query) => setStockSymbol(query.toUpperCase())} />  
      <h1>📈 Stock Market</h1>
      <StockCard symbol={stockSymbol} />
      <PriceChart symbol={stockSymbol} type="stock" />
    </div>
  );
};

export default Stock;
