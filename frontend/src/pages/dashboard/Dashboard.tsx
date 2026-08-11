import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { customerService } from '../../services/customer.service';
import { productService } from '../../services/product.service';
import { challanService } from '../../services/challan.service';
import type { Product } from '../../types/product.types';
import type { Challan } from '../../types/challan.types';
import { Users, Package, FileText, AlertTriangle, ArrowRight } from 'lucide-react';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  totalChallans: number;
  draftChallans: number;
  confirmedChallans: number;
}

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) { setLoading(false); return; }
    const fetchStats = async () => {
      try {
        const role = user.role;
        const canCustomers = ['ADMIN','SALES','ACCOUNTS'].includes(role);
        const canProducts = ['ADMIN','WAREHOUSE','SALES','ACCOUNTS'].includes(role);
        const canChallans = ['ADMIN','SALES','ACCOUNTS'].includes(role);
        const [customers, products, challans] = await Promise.all([
          canCustomers ? customerService.getAll({ limit: 1 }) : null,
          canProducts ? productService.getAll({ limit: 100 }) : null,
          canChallans ? challanService.getAll({ limit: 100 }) : null,
        ]);
        const productData = products?.data as Product[] | undefined;
        const challanData = challans?.data as Challan[] | undefined;
        setStats({
          totalCustomers: customers?.total || 0,
          totalProducts: products?.total || 0,
          lowStockProducts: productData?.filter(p => p.currentStock <= p.minimumStock).length || 0,
          totalChallans: challans?.total || 0,
          draftChallans: challanData?.filter(c => c.status === 'DRAFT').length || 0,
          confirmedChallans: challanData?.filter(c => c.status === 'CONFIRMED').length || 0,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data. Please try again.');
      } finally { setLoading(false); }
    };
    fetchStats();
  }, [user, isAuthenticated]);

  if (!isAuthenticated || !user) return <div className="nexus-empty">Please sign in to view the dashboard.</div>;
  if (loading) return <div className="nexus-empty"><Loader size="lg" /></div>;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const cards = [
    { title:'Customers', value:stats?.totalCustomers || 0, icon:Users, link:'/customers', note:'Customer accounts' },
    { title:'Products', value:stats?.totalProducts || 0, icon:Package, link:'/products', note:'Catalog items' },
    { title:'Low Stock', value:stats?.lowStockProducts || 0, icon:AlertTriangle, link:'/inventory', note:'Items need attention' },
    { title:'Sales Challans', value:stats?.totalChallans || 0, icon:FileText, link:'/challans', note:'Outbound documents' },
  ];

  return (
    <section className="nexus-page">
      <header className="nexus-page-header">
        <div><h1>Operations Dashboard</h1><p>Real-time overview of your Nexus ERP operations.</p></div>
        <div className="nexus-badge">{user.role} workspace</div>
      </header>

      <div className="nexus-bento-grid">
        {cards.map(({title,value,icon:Icon,link,note}) => (
          <Link to={link} className="nexus-stat-card nexus-stat-link" key={title}>
            <div className="nexus-stat-top"><span>{title}</span><Icon size={18}/></div>
            <strong>{value}</strong><small>{note}</small>
          </Link>
        ))}
      </div>

      <div className="nexus-dashboard-grid">
        <div className="nexus-card">
          <div className="nexus-card-heading"><h2>Operations Pulse</h2><span className="nexus-badge">Live data</span></div>
          <div className="nexus-pulse-row"><span>Draft challans</span><strong>{stats?.draftChallans || 0}</strong></div>
          <div className="nexus-pulse-row"><span>Confirmed challans</span><strong>{stats?.confirmedChallans || 0}</strong></div>
          <div className="nexus-pulse-row"><span>Low stock items</span><strong className={stats?.lowStockProducts ? 'nexus-danger-text' : ''}>{stats?.lowStockProducts || 0}</strong></div>
        </div>
        <div className="nexus-card nexus-dark-card">
          <div className="nexus-kicker">Quick actions</div>
          <h2>Move work forward</h2>
          <p>Create a customer, add a product, update stock or issue a sales challan.</p>
          <div className="nexus-quick-links">
            <Link to="/customers/new">New customer <ArrowRight size={15}/></Link>
            <Link to="/products/new">New product <ArrowRight size={15}/></Link>
            <Link to="/challans/new">New challan <ArrowRight size={15}/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
