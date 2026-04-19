import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartView({
  reports = [],
  selectedProvince,
}) {
  
  if (!reports.length || selectedProvince === "all") {
    return <p>Chọn tỉnh để xem thống kê</p>;
  }

 
  const dataMap = {};

  reports.forEach((r) => {
    if (!r.created_at) return;

    const date = new Date(r.created_at);
    const month = date.getMonth() + 1; // 1 → 12

    if (!dataMap[month]) dataMap[month] = 0;
    dataMap[month]++;
  });


  const data = Array.from({ length: 12 }, (_, i) => ({
    month: `T${i + 1}`,
    value: dataMap[i + 1] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}