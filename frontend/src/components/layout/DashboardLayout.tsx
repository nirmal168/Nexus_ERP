import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Warehouse, FileText, WalletCards,
  HelpCircle, LogOut, Plus, X, Menu
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PageLoader } from '../common/Loader';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN','SALES','WAREHOUSE','ACCOUNTS'] },
  { name: 'Customers', path: '/customers', icon: Users, roles: ['ADMIN','SALES','ACCOUNTS'] },
  { name: 'Inventory', path: '/inventory', icon: Warehouse, roles: ['ADMIN','WAREHOUSE','SALES','ACCOUNTS'] },
  { name: 'Sales', path: '/challans', icon: FileText, roles: ['ADMIN','SALES','ACCOUNTS'] },
  { name: 'Accounts', path: '/accounts', icon: WalletCards, roles: ['ADMIN','ACCOUNTS'] },
];

export function DashboardLayout() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const filtered = navItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="nexus-app">
      {sidebarOpen && <button aria-label="Close navigation" className="nexus-mobile-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`nexus-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="nexus-brand">
          <div className="nexus-brand-mark"><span>N</span></div>
          <div>
            <div className="nexus-brand-title">Nexus ERP</div>
            <div className="nexus-brand-subtitle">Operations Portal</div>
          </div>
          <button className="nexus-mobile-close" onClick={() => setSidebarOpen(false)}><X size={18}/></button>
        </div>

        <div className="nexus-portal-block">
          <div className="nexus-kicker">Operations Portal</div>
          <div className="nexus-portal-role">{user?.role === 'WAREHOUSE' ? 'Warehouse Admin' : `${user?.role || 'User'} Workspace`}</div>
        </div>

        <Link to="/challans/new" className="nexus-new-entry" onClick={() => setSidebarOpen(false)}>
          <Plus size={17}/> New Entry
        </Link>

        <nav className="nexus-nav">
          {filtered.map(({name,path,icon:Icon}) => {
            const active = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`nexus-nav-item ${active ? 'active' : ''}`}
              >
                <Icon size={19} strokeWidth={active ? 2.3 : 1.9}/>
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nexus-sidebar-footer">
          <button className="nexus-nav-item nexus-sidebar-button"><HelpCircle size={19}/> <span>Support</span></button>
          <button className="nexus-nav-item nexus-sidebar-button" onClick={logout}><LogOut size={19}/> <span>Logout</span></button>
        </div>
      </aside>

      <div className="nexus-main">
        <div className="nexus-mobile-topbar">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22}/></button>
          <strong>Nexus ERP</strong>
          <span>{user?.role}</span>
        </div>
        <main className="nexus-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
