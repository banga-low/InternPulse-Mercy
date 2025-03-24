import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchStockData } from '../services/stockAPI';
import { fetchCryptoData } from '../services/cryptoAPI';
import { Chart, registerables } from 'chart.js';
import { getSymbolType, STOCK_SYMBOLS, CRYPTO_SYMBOLS } from '../config/symbols';

Chart.register(...registerables);

const PriceChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [symbolType, setSymbolType] = useState(null);

  useEffect(() => {
    if (!symbol) {
      setError('No symbol provided');
      setLoading(false);
      return;
    }

    const type = getSymbolType(symbol);
    if (!type) {
      setError(`Invalid symbol: ${symbol}`);
      setLoading(false);
      return;
    }
    setSymbolType(type);

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const data = type === 'stock' 
          ? await fetchStockData(symbol)
          : await fetchCryptoData(symbol);

        if (!data) throw new Error(`Failed to fetch ${type} data`);

        setChartData({
          labels: data.map(item => item.date),
          datasets: [{
            label: `${symbol} (${type === 'stock' ? STOCK_SYMBOLS[symbol.toUpperCase()] : CRYPTO_SYMBOLS[symbol.toLowerCase()]})`,
            data: data.map(item => item.price),
            borderColor: type === 'stock' ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
            backgroundColor: type === 'stock' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(153, 102, 255, 0.2)',
            borderWidth: 2,
            tension: 0.1,
            fill: true
          }]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading) return <div className="p-4 text-center">Loading chart data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!chartData) return <div className="p-4">No data available for {symbol}</div>;

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-2">
        {symbol} ({symbolType === 'stock' ? 'Stock' : 'Crypto'})
      </h3>
      <Line 
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }}
      />
    </div>
  );
};

export default PriceChart;