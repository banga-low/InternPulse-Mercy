import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Chart = ({ data }) => {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  );
};

export default Chart;
