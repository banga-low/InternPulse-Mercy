import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../services/cryptoAPI";

const CryptoCard = ({ coin }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoData(coin);
        
        if (!data || data.error) {
          throw new Error(data?.error || "Failed to fetch crypto data");
        }

        setCryptoData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching crypto data:", err);
        setError(err.message);
        setCryptoData(null);
      } finally {
        setLoading(false);
      }
    };

    if (coin) {
      getCryptoData();
    } else {
      setError("No cryptocurrency selected");
      setLoading(false);
    }
  }, [coin]);

  if (loading) return <div className="loading">Loading {coin} data...</div>;
  if (error) return <div className="error">Error loading {coin}: {error}</div>;
  if (!cryptoData) return <div className="error">No data available for {coin}</div>;

  return (
    <div className="crypto-data">
      <h3>{coin.toUpperCase()}</h3>
      <p>Price: ${cryptoData[0]?.price?.toLocaleString() || "N/A"}</p>
      <p>Date: {new Date(cryptoData[0]?.date).toLocaleDateString() || "N/A"}</p>
    </div>
  );
};

export default CryptoCard;