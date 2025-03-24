import React, { useEffect, useState } from "react";
import { fetchStockData } from "../services/stockAPI";

const StockCard = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const data = await fetchStockData(symbol);

        if (!data) {
          throw new Error("Failed to fetch stock data");
        }

        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getStockData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stockData) return <div>No data available</div>;

  return (
    <div>
      <h2>{symbol}</h2>
      <p>Price: ${stockData[0]?.price?.toLocaleString() || "N/A"}</p>
      <p>Date: {stockData[0]?.date || "N/A"}</p>
    </div>
  );
};

export default StockCard;