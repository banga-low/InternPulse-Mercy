import axios from 'axios';
import { STOCK_SYMBOLS } from '../config/symbols';

const stockCache = new Map();

export const fetchStockData = async (symbol) => {
  const upperSymbol = symbol.toUpperCase();
  
  if (!STOCK_SYMBOLS[upperSymbol]) {
    console.error(`Rejected invalid stock symbol: ${symbol}`);
    return null;
  }

  if (stockCache.has(upperSymbol)) {
    return stockCache.get(upperSymbol);
  }

  try {
    const response = await axios.get(
      `https://api.twelvedata.com/time_series?symbol=${upperSymbol}&interval=1day&outputsize=7&apikey=${import.meta.env.VITE_TWELVE_DATA_API_KEY}`
    );

    if (!response.data?.values) {
      throw new Error("Invalid stock data response");
    }

    const formattedData = response.data.values
      .map(item => ({
        date: new Date(item.datetime).toLocaleDateString(),
        price: parseFloat(item.close)
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    stockCache.set(upperSymbol, formattedData);
    return formattedData;
  } catch (error) {
    console.error(`Stock API error for ${upperSymbol}:`, error);
    return null;
  }
};