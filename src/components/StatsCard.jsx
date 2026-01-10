export default function StatsCard({ label, value, icon, color = '#00d9ff' }) {
  return (
    <div style={{
      border: `2px solid ${color}`,
      borderRadius: '4px',
      padding: '1.5rem',
      background: `linear-gradient(135deg, rgba(0, 217, 255, 0.03) 0%, rgba(178, 75, 255, 0.02) 100%)`,
      boxShadow: `0 0 30px ${color}40, inset 0 0 15px ${color}15`,
      textAlign: 'center',
      flex: 1,
      minWidth: '200px'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ color: '#8b9dc3', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
        {label}
      </div>
      <div style={{ fontSize: '2.5rem', color, fontWeight: 'bold', marginTop: '0.5rem', textShadow: `0 0 10px ${color}` }}>
        {value}
      </div>
    </div>
  );
}
