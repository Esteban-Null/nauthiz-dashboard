import { useState, useEffect } from 'react'
import RiskChart from './components/RiskChart'
import TimelineChart from './components/TimelineChart'
import GaugeChart from './components/GaugeChart'
import StatsCard from './components/StatsCard'
import TopIOCsTable from './components/TopIOCsTable'

export default function App() {
  const [stats, setStats] = useState({
    total_queries: 1247,
    high_risk: 42,
    clean_iocs: 1189,
    avg_response: '245ms'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = 'import.meta.env.VITE_API_KEY'
    
    fetch('http://127.0.0.1:8000/api/stats', {
      headers: { 'X-API-Key': API_KEY }
    })
      .then(r => r.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching stats:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0f2c 0%, #0f1a3f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(178, 75, 255, 0.02) 0%, transparent 50%)
        `,
        backdropFilter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        color: '#00d9ff',
        padding: '2rem',
        fontFamily: 'Courier New, monospace'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          textShadow: '0 0 20px #00d9ff, 0 0 40px #b24bff',
          marginBottom: '2rem', 
          letterSpacing: '3px',
          color: '#00d9ff'
        }}>
          NAUTHIZ THREAT INTEL DASHBOARD
        </h1>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <StatsCard icon="📊" label="Total Queries" value={stats.total_queries.toLocaleString()} color="#00d9ff" />
          <StatsCard icon="⚠️" label="High Risk IOCs" value={stats.high_risk} color="#ff006e" />
          <StatsCard icon="✓" label="Clean IOCs" value={stats.clean_iocs.toLocaleString()} color="#00d9ff" />
          <StatsCard icon="⏱️" label="Avg Response" value={stats.avg_response} color="#b24bff" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <RiskChart />
          <TimelineChart />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
          <GaugeChart />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <TopIOCsTable />
        </div>
      </div>
    </div>
  )
}
