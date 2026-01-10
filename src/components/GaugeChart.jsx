import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function GaugeChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const option = {
      backgroundColor: '#0a0e27',
      series: [{
        type: 'gauge',
        startAngle: 225,
        endAngle: -45,
        progress: { itemStyle: { color: '#00ff88' } },
        axisLine: { lineStyle: { color: [[1, '#00ff881a']] } },
        axisTick: { distance: -30, splitNumber: 4, lineStyle: { color: '#00ff88', width: 2 } },
        splitLine: { distance: -30, splitNumber: 4, lineStyle: { color: '#00ff88', width: 2 } },
        axisLabel: { color: 'auto', distance: 40, fontSize: 16 },
        detail: { valueAnimation: true, formatter: '{value}%', color: '#00ff88', fontSize: 20 },
        data: [{ value: 78, name: 'Overall Risk Score' }]
      }]
    };
    chart.setOption(option);
    return () => chart.dispose();
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '350px' }} />;
}
