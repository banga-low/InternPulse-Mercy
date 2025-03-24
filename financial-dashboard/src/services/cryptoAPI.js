import axios from 'axios';
import { CRYPTO_SYMBOLS } from '../config/symbols';

const cryptoCache = new Map();

export const fetchCryptoData = async (symbol) => {
  const lowerSymbol = symbol.toLowerCase();
  
  if (!CRYPTO_SYMBOLS[lowerSymbol]) {
    console.error(`Rejected invalid crypto symbol: ${symbol}`);
    return null;
  }

  if (cryptoCache.has(lowerSymbol)) {
    return cryptoCache.get(lowerSymbol);
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${lowerSymbol}/market_chart?vs_currency=usd&days=7`
    );

    if (!response.data?.prices) {
      throw new Error("Invalid crypto data response");
    }

    const formattedData = response.data.prices
      .map(item => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[1]
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    cryptoCache.set(lowerSymbol, formattedData);
    return formattedData;
  } catch (error) {
    console.error(`Crypto API error for ${lowerSymbol}:`, error);
    return null;
  }
};