export function Settings() {
  return (
    <section className="nexus-page">
      <header className="nexus-page-header">
        <div><h1>Settings</h1><p>Manage your Nexus ERP workspace and operational preferences.</p></div>
      </header>
      <div className="nexus-settings-grid">
        {[
          ['Workspace','Operations Portal','Configure organization and warehouse preferences.'],
          ['Security','Role-based access','Authentication and permission controls are active.'],
          ['Notifications','Operational alerts','Configure stock, sales and approval notifications.'],
        ].map(([title,value,desc]) => (
          <div className="nexus-card" key={title}><div className="nexus-kicker light">{title}</div><h2>{value}</h2><p>{desc}</p><button className="nexus-outline-button">Configure</button></div>
        ))}
      </div>
    </section>
  );
}
