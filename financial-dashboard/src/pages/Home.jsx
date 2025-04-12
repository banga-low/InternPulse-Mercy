import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import StockCard from "../components/StockCard";
import CryptoCard from "../components/CryptoCard";
import PriceChart from "../components/PriceChart";
import "../App.css"; 

const Home = () => {
  const [stockSymbols, setStockSymbols] = useState(["AAPL", "GOOGL", "TSLA"]);
  const [cryptoSymbols, setCryptoSymbols] = useState(["bitcoin", "ethereum", "dogecoin"]);

  const handleSearch = (query) => {
    if (/^\d+$/.test(query)) return;

    if (query.length <= 5) {
      setStockSymbols((prev) => [...new Set([...prev, query.toUpperCase()])]);
    } else {
      setCryptoSymbols((prev) => [...new Set([...prev, query.toLowerCase()])]);
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <Header onSearch={handleSearch} /> {/* Title now handled in Header */}
      
      <div className="section">
        <h2>📈 Stock Market</h2>
        <div className="grid-container">
          {stockSymbols.map((symbol) => (
            <div key={symbol} className="card-wrapper">
              <StockCard symbol={symbol} />
              <PriceChart symbol={symbol} type="stock" />
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>💰 Cryptocurrency Market</h2>
        <div className="grid-container">
          {cryptoSymbols.map((coin) => (
            <div key={coin} className="card-wrapper">
              <CryptoCard coin={coin} />
              <PriceChart symbol={coin} type="crypto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
