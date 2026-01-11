import { useState, useEffect } from 'react'
import './App.css'
import StatsCard from './components/StatsCard'
import RiskChart from './components/RiskChart'
import TimelineChart from './components/TimelineChart'
import GaugeChart from './components/GaugeChart'
import QueryBox from './components/QueryBox'
import QueryResults from './components/QueryResults'
import TopIOCsTable from './components/TopIOCsTable'

export default function App() {
  const [stats, setStats] = useState({
    total_queries: 0,
    high_risk: 0,
    clean_iocs: 0,
    avg_response: '0ms'
  })
  const [queryResults, setQueryResults] = useState({})

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY
    fetch('http://127.0.0.1:8000/api/stats', {
      headers: { 'X-API-Key': API_KEY }
    })
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(err => console.error('App stats error:', err))
  }, [])

  return (
    <div className="app">
      <h1>⚡ NAUTHIZ THREAT INTEL DASHBOARD ⚡</h1>
      
      <div className="stats-grid">
        <StatsCard icon="📊" label="Total Queries" value={stats.total_queries?.toLocaleString() || 0} />
        <StatsCard icon="🔴" label="High Risk IOCs" value={stats.high_risk || 0} />
        <StatsCard icon="✅" label="Clean IOCs" value={stats.clean_iocs?.toLocaleString() || 0} />
        <StatsCard icon="⚡" label="Avg Response" value={stats.avg_response || '0ms'} />
      </div>

      <div className="scanner-zone">
        <QueryBox onResults={setQueryResults} />
        <QueryResults results={queryResults} />
      </div>

      <div className="charts">
        <RiskChart />
        <TimelineChart />
        <GaugeChart />
      </div>

      <TopIOCsTable />
    </div>
  )
}
