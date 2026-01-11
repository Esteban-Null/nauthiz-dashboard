import './StatsCard.css'

export default function StatsCard({ icon, label, value }) {
  return (
    <div className="stats-card">
      <div className="card-glow"></div>
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <div className="card-label">{label}</div>
        <div className="card-value">{value}</div>
      </div>
      <div className="scan-effect"></div>
    </div>
  )
}
