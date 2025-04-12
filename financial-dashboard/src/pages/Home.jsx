import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import StockCard from "../components/StockCard";
import CryptoCard from "../components/CryptoCard";
import PriceChart from "../components/PriceChart";
import "../App.css";

const Home = () => {
  const [stockSymbols, setStockSymbols] = useState(["AAPL", "GOOGL", "TSLA"]);
  const [cryptoSymbols, setCryptoSymbols] = useState(["bitcoin", "ethereum"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (/^\d+$/.test(query)) return;
    setLoading(true);
    setError(null);

    try {
      const trimmedQuery = query.trim().toUpperCase();
      if (!trimmedQuery) return;

      if (trimmedQuery.length <= 5) {
        setStockSymbols((prev) => [...new Set([...prev, trimmedQuery])]);
      } else {
        setCryptoSymbols((prev) => [...new Set([...prev, trimmedQuery.toLowerCase()])]);
      }
    } catch (err) {
      setError("Failed to add symbol. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (type, symbol) => {
    if (type === 'stock') {
      setStockSymbols(prev => prev.filter(item => item !== symbol));
    } else {
      setCryptoSymbols(prev => prev.filter(item => item !== symbol));
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <Header onSearch={handleSearch} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="section">
        <h2>📈 Stock Market</h2>
        <div className="grid-container">
          {stockSymbols.map((symbol) => (
            <div key={symbol} className="card-wrapper">
              <div className="card-content">
                <StockCard symbol={symbol} />
                <button 
                  className="remove-btn"
                  onClick={() => removeItem('stock', symbol)}
                >
                  ×
                </button>
              </div>
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
              <div className="card-content">
                <CryptoCard coin={coin} />
                <button 
                  className="remove-btn"
                  onClick={() => removeItem('crypto', coin)}
                >
                  ×
                </button>
              </div>
              <PriceChart symbol={coin} type="crypto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;