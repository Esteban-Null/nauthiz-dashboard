import { useState } from 'react'
import './QueryResults.css'

export default function QueryResults({ results }) {
  const [expandedField, setExpandedField] = useState(null)

  if (!results || Object.keys(results).length === 0) {
    return null
  }

  const riskLevel = results.risk_level || 'UNKNOWN'
  const riskScore = results.score || 0

  const getRiskColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'critical': return '#ff0080'
      case 'high': return '#ff6600'
      case 'medium': return '#00ffff'
      case 'low': return '#00ff88'
      default: return '#00ffff'
    }
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>⚡ SCAN RESULTS</h2>
        <div className="result-timestamp">
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="threat-level-box" style={{ borderColor: getRiskColor(riskLevel) }}>
        <div className="threat-indicator">
          <div className="threat-label">THREAT LEVEL</div>
          <div 
            className="threat-value" 
            style={{ color: getRiskColor(riskLevel) }}
          >
            {riskLevel}
          </div>
          <div className="threat-bar">
            <div 
              className="threat-fill" 
              style={{
                width: `${riskScore}%`,
                background: getRiskColor(riskLevel),
                boxShadow: `0 0 15px ${getRiskColor(riskLevel)}`
              }}
            ></div>
          </div>
          <div className="threat-score">{riskScore.toFixed(0)}/100</div>
        </div>
      </div>

      <div className="data-grid">
        <div className="data-section">
          <h3>IOC DATA</h3>
          <div className="data-row">
            <span className="label">IOC:</span>
            <span className="value">{results.ioc}</span>
          </div>
          <div className="data-row">
            <span className="label">TYPE:</span>
            <span className="value">{results.ioc_type?.toUpperCase()}</span>
          </div>
        </div>

        <div className="data-section">
          <h3>TEMPORAL DATA</h3>
          <div className="data-row">
            <span className="label">FIRST SEEN:</span>
            <span className="value">{results.first_seen_global || 'N/A'}</span>
          </div>
          <div className="data-row">
            <span className="label">LAST UPDATED:</span>
            <span className="value">
              {new Date(results.last_updated).toLocaleString()}
            </span>
          </div>
          <div className="data-row">
            <span className="label">ACTIVITY PHASE:</span>
            <span className="value">{results.activity_phase || 'UNKNOWN'}</span>
          </div>
        </div>
      </div>

      <div className="enrichment-section">
        <h3>🔍 ENRICHMENT DATA</h3>
        
        {results.vt && (
          <div 
            className="enrichment-box"
            onClick={() => setExpandedField(expandedField === 'vt' ? null : 'vt')}
          >
            <div className="enrichment-header">
              <span>VirusTotal</span>
              <span className="expand-icon">{expandedField === 'vt' ? '▼' : '▶'}</span>
            </div>
            {expandedField === 'vt' && (
              <div className="enrichment-content">
                <pre>{JSON.stringify(results.vt, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {results.whois && (
          <div 
            className="enrichment-box"
            onClick={() => setExpandedField(expandedField === 'whois' ? null : 'whois')}
          >
            <div className="enrichment-header">
              <span>WHOIS</span>
              <span className="expand-icon">{expandedField === 'whois' ? '▼' : '▶'}</span>
            </div>
            {expandedField === 'whois' && (
              <div className="enrichment-content">
                <pre>{JSON.stringify(results.whois, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {results.securitytrails && (
          <div 
            className="enrichment-box"
            onClick={() => setExpandedField(expandedField === 'st' ? null : 'st')}
          >
            <div className="enrichment-header">
              <span>SecurityTrails</span>
              <span className="expand-icon">{expandedField === 'st' ? '▼' : '▶'}</span>
            </div>
            {expandedField === 'st' && (
              <div className="enrichment-content">
                <pre>{JSON.stringify(results.securitytrails, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sources-box">
        <h3>SOURCES</h3>
        <div className="sources-list">
          {results.sources?.map((source, idx) => (
            <span key={idx} className="source-tag">{source}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
