import { useState, useEffect } from 'react'

export default function GaugeChart() {
  const [riskScore, setRiskScore] = useState(0)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY
    fetch('http://127.0.0.1:8000/api/stats', {
      headers: { 'X-API-Key': API_KEY }
    })
      .then(r => r.json())
      .then(res => {
        setRiskScore(res.avg_risk_score || 0)
      })
      .catch(err => console.error('GaugeChart error:', err))
  }, [])

  const getColor = (score) => {
    if (score < 25) return '#00ff88'
    if (score < 50) return '#00ffff'
    if (score < 75) return '#ff6600'
    return '#ff0080'
  }

  const rotation = (riskScore / 100) * 180 - 90

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Overall Risk Score</h3>
      
      <div style={styles.gaugeContainer}>
        <svg width="200" height="120" viewBox="0 0 200 120" style={styles.svg}>
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="8"
          />
          
          {/* Needle */}
          <g transform={`rotate(${rotation} 100 100)`}>
            <line x1="100" y1="100" x2="100" y2="30" stroke={getColor(riskScore)} strokeWidth="3" />
            <circle cx="100" cy="100" r="5" fill={getColor(riskScore)} />
          </g>

          {/* Risk arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={getColor(riskScore)}
            strokeWidth="8"
            strokeDasharray={`${(riskScore / 100) * 251} 251`}
            filter="drop-shadow(0 0 10px currentColor)"
            style={{ color: getColor(riskScore) }}
          />
        </svg>

        <div style={styles.scoreDisplay}>
          <div style={{...styles.score, color: getColor(riskScore)}}>
            {riskScore.toFixed(0)}%
          </div>
          <div style={styles.label}>THREAT LEVEL</div>
        </div>
      </div>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={{...styles.dot, background: '#00ff88'}}></span> Low
        </div>
        <div style={styles.legendItem}>
          <span style={{...styles.dot, background: '#00ffff'}}></span> Medium
        </div>
        <div style={styles.legendItem}>
          <span style={{...styles.dot, background: '#ff6600'}}></span> High
        </div>
        <div style={styles.legendItem}>
          <span style={{...styles.dot, background: '#ff0080'}}></span> Critical
        </div>
      </div>
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
    fontSize: '1.2em',
    textAlign: 'center'
  },
  gaugeContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    height: '180px'
  },
  svg: {
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))'
  },
  scoreDisplay: {
    position: 'absolute',
    bottom: '20px',
    textAlign: 'center'
  },
  score: {
    fontSize: '2em',
    fontWeight: 'bold',
    textShadow: '0 0 20px currentColor'
  },
  label: {
    color: '#00ffff',
    fontSize: '0.8em',
    letterSpacing: '2px',
    marginTop: '5px'
  },
  legend: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '15px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#00ffff',
    fontSize: '0.9em'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    boxShadow: '0 0 8px currentColor'
  }
}
