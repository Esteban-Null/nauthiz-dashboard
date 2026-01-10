import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function RiskChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const option = {
      backgroundColor: 'transparent',
      title: { text: 'Risk Distribution', textStyle: { color: '#00d9ff', fontSize: 16, fontWeight: 'bold' } },
      series: [{
        data: [
          { value: 45, name: 'Low', itemStyle: { color: '#00d9ff' } },
          { value: 30, name: 'Medium', itemStyle: { color: '#4a90e2' } },
          { value: 20, name: 'High', itemStyle: { color: '#ff006e' } },
          { value: 5, name: 'Critical', itemStyle: { color: '#ff0066' } },
        ],
        type: 'pie',
      }]
    };
    chart.setOption(option);
    return () => chart.dispose();
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}
