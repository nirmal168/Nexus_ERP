import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-[#E5E7EB]">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-[#5F6B76] hover:text-[#1F2933] mr-2"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[#1F2933]">
              Welcome back, {user?.name || 'User'}
            </h2>
            <p className="text-sm text-[#5F6B76] mt-1 hidden sm:block">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 text-[#5F6B76] hover:text-[#1F2933] transition-colors relative">
            <Bell className="h-5 w-5 md:h-6 md:w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-[#DC2626] rounded-full" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-[#FF5A1F] rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-[#1F2933]">{user?.name}</p>
              <p className="text-xs text-[#5F6B76]">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}