import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function TimelineChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const option = {
      backgroundColor: '#0a0e27',
      title: { text: 'Queries Timeline', textStyle: { color: '#00ff88' } },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{
        data: [120, 200, 150, 80, 220, 250, 180],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#00ff88' },
        lineStyle: { color: '#00ff88', width: 3 },
        areaStyle: { color: 'rgba(0, 255, 136, 0.2)' },
      }]
    };
    chart.setOption(option);
    return () => chart.dispose();
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
