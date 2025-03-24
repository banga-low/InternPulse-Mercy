import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";  
import CryptoCard from "../components/CryptoCard";
import PriceChart from "../components/PriceChart";

const Crypto = () => {
  const [cryptoSymbol, setCryptoSymbol] = useState("bitcoin");

  return (
    <div>
      <Navbar />
      <Header onSearch={(query) => setCryptoSymbol(query.toLowerCase())} />  
      <h1>🚀 Crypto Market</h1>
      <CryptoCard coin={cryptoSymbol} />
      <PriceChart symbol={cryptoSymbol} type="crypto" />
    </div>
  );
};

export default Crypto;
