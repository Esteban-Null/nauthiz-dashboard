import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function RiskChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY
    fetch('http://127.0.0.1:8000/api/stats', {
      headers: { 'X-API-Key': API_KEY }
    })
      .then(r => r.json())
      .then(res => {
        setData([
          { name: 'Critical', value: res.critical || 0 },
          { name: 'High', value: res.high_risk || 0 },
          { name: 'Medium', value: res.medium_risk || 0 },
          { name: 'Low', value: res.low_risk || 0 }
        ])
      })
      .catch(err => console.error('RiskChart error:', err))
  }, [])

  const COLORS = ['#ff0080', '#ff6600', '#00ffff', '#00ff88']

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Risk Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              background: 'rgba(10, 14, 39, 0.9)',
              border: '2px solid #00ffff',
              borderRadius: '8px',
              color: '#00ffff'
            }}
          />
          <Legend 
            wrapperStyle={{
              color: '#00ffff',
              paddingTop: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

const styles = {
  container: {
    background: 'rgba(10, 14, 39, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '2px solid #00ffff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    transition: 'all 0.3s ease'
  },
  title: {
    color: '#00ffff',
    textShadow: '0 0 15px #00ffff',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '1.2em'
  }
}
