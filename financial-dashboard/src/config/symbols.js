
export const STOCK_SYMBOLS = {
    AAPL: 'Apple',
    GOOGL: 'Google',
    MSFT: 'Microsoft',
    AMZN: 'Amazon',
    TSLA: 'Tesla'
  };
  
  export const CRYPTO_SYMBOLS = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    dogecoin: 'Dogecoin'
  };
  
  export function getSymbolType(symbol) {
    if (STOCK_SYMBOLS[symbol.toUpperCase()]) return 'stock';
    if (CRYPTO_SYMBOLS[symbol.toLowerCase()]) return 'crypto';
    return null;
  }