import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../services/cryptoAPI";

const CryptoCard = ({ symbol }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) {
      setError("Symbol is undefined");
      setLoading(false);
      return;
    }

    const getCryptoData = async () => {
      try {
        const data = await fetchCryptoData(symbol);

        if (!data) {
          throw new Error("Failed to fetch crypto data");
        }

        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCryptoData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cryptoData) return <div>No data available</div>;

  return (
    <div>
      <h2>{symbol.toUpperCase()}</h2>
      <p>Price: ${cryptoData[0]?.price?.toLocaleString() || "N/A"}</p>
      <p>Date: {cryptoData[0]?.date || "N/A"}</p>
    </div>
  );
};

export default CryptoCard;