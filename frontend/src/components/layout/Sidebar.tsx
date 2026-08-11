import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Warehouse, 
  FileText,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'] },
  { name: 'Customers', path: '/customers', icon: <Users className="h-5 w-5" />, roles: ['ADMIN', 'SALES'] },
  { name: 'Products', path: '/products', icon: <Package className="h-5 w-5" />, roles: ['ADMIN', 'WAREHOUSE'] },
  { name: 'Inventory', path: '/inventory', icon: <Warehouse className="h-5 w-5" />, roles: ['ADMIN', 'WAREHOUSE'] },
  { name: 'Challans', path: '/challans', icon: <FileText className="h-5 w-5" />, roles: ['ADMIN', 'SALES', 'ACCOUNTS'] },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E5E7EB] transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-xl font-bold text-[#1F2933]">Fundsroom ERP</h1>
          <p className="text-sm text-[#5F6B76] mt-1">{user?.name}</p>
          <p className="text-xs text-[#8A949E]">{user?.role}</p>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-2 text-[#5F6B76] hover:text-[#1F2933]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#0B3B3A] text-white' 
                      : 'text-[#5F6B76] hover:bg-[#F8F8F7] hover:text-[#1F2933]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#5F6B76]'}>
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#E5E7EB]">
        <button
          onClick={() => {
            logout();
            handleLinkClick();
          }}
          className="flex items-center w-full px-4 py-3 text-[#5F6B76] hover:bg-[#F8F8F7] hover:text-[#1F2933] rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}