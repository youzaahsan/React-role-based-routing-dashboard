import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  ShoppingCart, 
  ClipboardList, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert,
  Building,
  ChevronRight,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  // Let's define the navigation maps for all three roles
  const navigationItems = {
    admin: [
      { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
      { name: 'Manage Users', path: '/admin/users', icon: Users },
      { name: 'Product Catalog', path: '/admin/products', icon: ShoppingBag },
      { name: 'System Settings', path: '/admin/settings', icon: Settings },
    ],
    seller: [
      { name: 'Seller Analytics', path: '/seller', icon: LayoutDashboard },
      { name: 'Order Processing', path: '/seller/orders', icon: ShoppingCart },
    ],
    employee: [
      { name: 'Task Board', path: '/employee', icon: LayoutDashboard },
      { name: 'My Tasks', path: '/employee/tasks', icon: ClipboardList },
      { name: 'Employee Profile', path: '/employee/profile', icon: UserIcon },
    ],
  };

  const currentItems = navigationItems[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleBadgeColor = {
    admin: 'bg-rose-50 border-rose-200 text-rose-700',
    seller: 'bg-amber-50 border-amber-200 text-amber-700',
    employee: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  }[user.role];

  const roleBadgeColorSidebar = {
    admin: 'bg-rose-950/50 border-rose-900/40 text-rose-300',
    seller: 'bg-amber-950/50 border-amber-900/40 text-amber-300',
    employee: 'bg-emerald-950/40 border-emerald-950/80 text-emerald-300',
  }[user.role];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 sticky top-0 h-screen z-10">
        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-slate-100 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm tracking-wider">
              M
            </div>
            <span className="font-sans font-semibold tracking-tight text-base">Monolith Setup</span>
          </Link>
        </div>

        {/* User Card inside Sidebar */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/45 border border-slate-800/50 flex-row">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-9 h-9 rounded-full border border-slate-800 object-cover shrink-0 animate-fade-in"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-semibold text-slate-200 truncate">{user.name}</h4>
              <p className="text-[10px] text-slate-400 truncate">{user.title}</p>
            </div>
          </div>
          <div className="mt-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${roleBadgeColorSidebar}`}>
              {user.role} Portal
            </span>
          </div>
        </div>

        {/* Dynamic Sidebar Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {currentItems.map((item) => {
            const Icon = item.icon;
            // Check if active: matches exactly or matches parent path
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
            
            return (
              <Link
                key={item.path}
                id={`nav-${item.path.replace(/\//g, '-')}`}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                }`} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="ml-auto w-1 h-4 rounded-full bg-blue-300"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Workspace info block */}
        <div className="p-3 shrink-0">
          <div className="bg-slate-800/20 rounded-lg p-3 border border-slate-800/40">
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-2 tracking-wider">Workspace Tech</div>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span><span>React Router v6</span></div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span><span>Tailwind CSS</span></div>
            </div>
          </div>
        </div>

        {/* Logout at bottom */}
        <div className="p-3 border-t border-slate-800 shrink-0">
          <button
            id="desktop-logout-btn"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3.5 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-all duration-200 text-sm font-medium group"
          >
            <LogOut className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. CHOSEN LAYOUT FLOW */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* TOPBAR / HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle btn */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb path */}
            <div className="hidden sm:flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer capitalize">
                {user.role} Hub
              </span>
              <span>/</span>
              <span className="text-slate-900 capitalize">
                {location.pathname.split('/').filter(Boolean)[1] || 'Dashboard'}
              </span>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-50 border border-slate-150 py-1.5 px-3 rounded-md font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Workspace Live (UTC)</span>
            </div>

            <button id="noti-btn" className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative rounded-full hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>

            {/* Micro login switcher link for quick testing convenience */}
            <Link 
              to="/" 
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline bg-blue-50/70 border border-blue-100 px-2.5 py-1.5 rounded font-bold"
            >
              Switch Portal
            </Link>
          </div>
        </header>

        {/* MOBILE SIDEBAR/DRAWER (AnimatePresence Overlay) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Back backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              />

              {/* Sidebar Content drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 shadow-2xl z-50 flex flex-col lg:hidden"
              >
                <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
                  <span className="font-sans font-semibold tracking-tight text-base text-slate-100">Monolith Setup</span>
                  <button
                    id="mobile-close-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 border-b border-slate-800">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/40 border border-slate-800/50">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full border border-slate-800 object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-slate-200 truncate">{user.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{user.title}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${roleBadgeColorSidebar}`}>
                      {user.role} Portal
                    </span>
                  </div>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                  {currentItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || 
                      (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                          isActive 
                            ? 'bg-blue-600 text-white font-semibold' 
                            : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-slate-800 shrink-0">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3.5 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-5 h-5 text-slate-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN PANEL CONTENT AND FOOTER */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50">
            <Outlet />
          </main>

          {/* Bottom Status Bar */}
          <footer className="h-8 bg-white border-t border-slate-200 flex-shrink-0 flex items-center justify-between px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex gap-4">
              <span className="text-blue-600 font-sans tracking-wide">Status: Portal_Live</span>
              <span className="hidden sm:inline">Role: {user.role}_Access</span>
              <span className="hidden md:inline">Region: US-East</span>
            </div>
            <div className="font-mono text-[9px] shrink-0">Path: {location.pathname}</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
