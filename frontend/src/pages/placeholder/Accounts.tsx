export function Accounts() {
  return (
    <section className="nexus-page">
      <header className="nexus-page-header">
        <div><h1>Accounts</h1><p>Review financial activity and operational account status.</p></div>
      </header>
      <div className="nexus-bento-grid">
        {[
          ['Receivables','₹ 4,82,500','Open customer balances'],
          ['Payables','₹ 1,76,250','Pending supplier balances'],
          ['This Month','₹ 8,42,900','Sales processed'],
          ['Pending','12','Items requiring attention'],
        ].map(([label,value,sub]) => (
          <div className="nexus-stat-card" key={label}><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>
        ))}
      </div>
      <div className="nexus-card"><div className="nexus-card-heading"><h2>Account activity</h2><span className="nexus-badge">Coming from ERP data</span></div><div className="nexus-empty">Account ledger views can be connected here when accounting APIs are enabled.</div></div>
    </section>
  );
}
