export default function TopIOCsTable() {
  const data = [
    { ioc: '192.168.1.1', type: 'IPv4', risk: 'CRITICAL', score: 95 },
    { ioc: '10.0.0.5', type: 'IPv4', risk: 'HIGH', score: 78 },
    { ioc: 'malware.com', type: 'Domain', risk: 'CRITICAL', score: 92 },
    { ioc: 'phish.io', type: 'Domain', risk: 'HIGH', score: 85 },
    { ioc: 'c2.evil.net', type: 'Domain', risk: 'CRITICAL', score: 98 },
  ];

  const riskColor = (risk) => {
    const colors = { CRITICAL: '#ff0066', HIGH: '#ff006e', MEDIUM: '#b24bff', LOW: '#00d9ff' };
    return colors[risk] || '#00d9ff';
  };

  return (
    <div style={{ 
      border: '2px solid #00d9ff', 
      borderRadius: '4px', 
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.03) 0%, rgba(178, 75, 255, 0.02) 100%)',
      boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)'
    }}>
      <h2 style={{ color: '#00d9ff', marginBottom: '1rem', fontSize: '1.5rem' }}>🎯 Top IOCs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #00d9ff' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem', color: '#8b9dc3' }}>IOC</th>
            <th style={{ textAlign: 'left', padding: '0.75rem', color: '#8b9dc3' }}>Type</th>
            <th style={{ textAlign: 'center', padding: '0.75rem', color: '#8b9dc3' }}>Risk</th>
            <th style={{ textAlign: 'center', padding: '0.75rem', color: '#8b9dc3' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
              <td style={{ padding: '0.75rem', color: '#00d9ff', fontFamily: 'monospace' }}>{row.ioc}</td>
              <td style={{ padding: '0.75rem', color: '#8b9dc3' }}>{row.type}</td>
              <td style={{ textAlign: 'center', padding: '0.75rem' }}>
                <span style={{ color: riskColor(row.risk), fontWeight: 'bold' }}>{row.risk}</span>
              </td>
              <td style={{ textAlign: 'center', padding: '0.75rem', color: riskColor(row.risk), fontWeight: 'bold' }}>
                {row.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
