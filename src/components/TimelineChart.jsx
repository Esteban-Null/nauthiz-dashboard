import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TimelineChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY
    fetch('http://127.0.0.1:8000/api/stats', {
      headers: { 'X-API-Key': API_KEY }
    })
      .then(r => r.json())
      .then(res => {
        setData([
          { day: 'Mon', queries: res.avg_queries_daily?.mon || 0 },
          { day: 'Tue', queries: res.avg_queries_daily?.tue || 0 },
          { day: 'Wed', queries: res.avg_queries_daily?.wed || 0 },
          { day: 'Thu', queries: res.avg_queries_daily?.thu || 0 },
          { day: 'Fri', queries: res.avg_queries_daily?.fri || 0 },
          { day: 'Sat', queries: res.avg_queries_daily?.sat || 0 },
          { day: 'Sun', queries: res.avg_queries_daily?.sun || 0 }
        ])
      })
      .catch(err => console.error('TimelineChart error:', err))
  }, [])

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Queries Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
          <XAxis dataKey="day" stroke="#00ffff" />
          <YAxis stroke="#00ffff" />
          <Tooltip 
            contentStyle={{
              background: 'rgba(10, 14, 39, 0.9)',
              border: '2px solid #00ffff',
              borderRadius: '8px',
              color: '#00ffff'
            }}
          />
          <Line
            type="monotone"
            dataKey="queries"
            stroke="#00ffff"
            strokeWidth={3}
            dot={{ fill: '#ff00ff', r: 6 }}
            activeDot={{ r: 8 }}
            filter="drop-shadow(0 0 10px #00ffff)"
          />
        </LineChart>
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
