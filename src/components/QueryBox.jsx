import { useState } from 'react'
import './QueryBox.css'

export default function QueryBox({ onResults }) {
  const [ioc, setIoc] = useState('')
  const [iocType, setIocType] = useState('ip')
  const [loading, setLoading] = useState(false)

  const handleQuery = async () => {
    if (!ioc.trim()) return

    setLoading(true)
    try {
      const API_KEY = import.meta.env.VITE_API_KEY
      const res = await fetch('http://127.0.0.1:8000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify({ ioc, ioc_type: iocType })
      })
      
      const data = await res.json()
      onResults(data)
      setIoc('')
    } catch (err) {
      console.error('Query error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleQuery()
  }

  return (
    <div className="query-box">
      <div className="query-header">
        <h2>🔍 THREAT SCANNER</h2>
        <div className="scanner-status">
          <span className={`status-dot ${loading ? 'scanning' : 'ready'}`}></span>
          {loading ? 'SCANNING...' : 'READY'}
        </div>
      </div>

      <div className="query-container">
        <div className="input-group">
          <label>IOC SIGNATURE</label>
          <input
            type="text"
            placeholder="Enter IP, domain or hash..."
            value={ioc}
            onChange={(e) => setIoc(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="ioc-input"
          />
        </div>

        <div className="type-group">
          <label>TYPE</label>
          <select
            value={iocType}
            onChange={(e) => setIocType(e.target.value)}
            disabled={loading}
            className="type-select"
          >
            <option value="ip">IP Address</option>
            <option value="domain">Domain</option>
            <option value="hash">Hash (MD5/SHA256)</option>
          </select>
        </div>

        <button
          onClick={handleQuery}
          disabled={loading || !ioc.trim()}
          className="query-button"
        >
          {loading ? '⏳ SCANNING' : '▶ EXECUTE'}
        </button>
      </div>
    </div>
  )
}
