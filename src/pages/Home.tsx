import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ShoppingBag, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';

export default function Home() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelection = (role: UserRole) => {
    login(role);
    navigate(`/${role}`);
  };

  const rolesConfig = [
    {
      role: 'admin' as UserRole,
      title: 'Administrator',
      desc: 'Full administrative access to override parameters, inspect global users, review inventory products, and adjust critical cloud setup structures.',
      icon: Shield,
      color: 'bg-rose-50 border-rose-200 hover:border-rose-300 text-rose-700',
      iconBg: 'bg-rose-100 text-rose-700',
      btnColor: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200',
      features: ['Admin Dashboard', 'User Account Table', 'Product Catalogs', 'System Settings']
    },
    {
      role: 'seller' as UserRole,
      title: 'Commercial Seller',
      desc: 'Operational portal to inspect sales metrics, track client order processing flow, verify items counts, and adjust shipping lists on active packages.',
      icon: ShoppingBag,
      color: 'bg-amber-50 border-amber-200 hover:border-amber-300 text-amber-700',
      iconBg: 'bg-amber-100 text-amber-700',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
      features: ['Sales Statistics', 'Order Delivery Tracking', 'Real-time Analytics']
    },
    {
      role: 'employee' as UserRole,
      title: 'Operations Employee',
      desc: 'Collaborative desk to view daily shift metrics, flag task priorities, check off corporate workflow tickets, and verify employee contact cards.',
      icon: Briefcase,
      color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300 text-emerald-700',
      iconBg: 'bg-emerald-100 text-emerald-700',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200',
      features: ['Personal Dashboard', 'Active Task Boards', 'Staff Profile Manager']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-12 px-6 relative overflow-hidden select-none">
      {/* Background graphic elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl -z-10" />

      {/* HEADER SECTION */}
      <header className="max-w-4xl mx-auto w-full text-center mb-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold mb-6 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>React Router DOM v6 Demonstration</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-white mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Role-Based Access Control
        </motion.h1>
        
        <motion.p 
          className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Select a mock profile to log in. The application simulates route guards, rendering custom menus and enforcing security layout access.
        </motion.p>
      </header>

      {/* BODY CARDS GRID */}
      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch my-8">
        {rolesConfig.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className={`flex flex-col justify-between p-6 rounded-2xl bg-slate-850 border border-slate-800 transition-all duration-300 hover:scale-[1.02] shadow-2xl relative group ${
                user?.role === item.role ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {user?.role === item.role && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  Currently Selected
                </span>
              )}

              <div>
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.iconBg}`}>
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-sans tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed min-h-[80px] mb-6">
                  {item.desc}
                </p>

                {/* Scope boundaries list */}
                <div className="space-y-2 mb-8 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Authorized Routes
                  </h4>
                  <ul className="space-y-1.5">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                id={`login-as-${item.role}`}
                onClick={() => handleRoleSelection(item.role)}
                className={`w-full py-3 h-12 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg outline-none ${item.btnColor}`}
              >
                <span>Login as {item.title}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          );
        })}
      </main>

      {/* FOOTER - SESSION STATE CONTROLS */}
      <footer className="max-w-4xl mx-auto w-full text-center mt-6">
        <AnimatePresence mode="wait">
          {user ? (
            <motion.div 
              key="logged-in-status"
              className="p-4 rounded-xl bg-slate-850 border border-slate-800 inline-flex flex-col sm:flex-row items-center gap-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center gap-3 text-left">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {user.name}
                    <span className="text-xs font-medium bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded border border-slate-700 capitalize">
                      {user.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-0 sm:pl-4 border-l-0 sm:border-l border-slate-800">
                <button
                  id="session-jump-btn"
                  onClick={() => navigate(`/${user.role}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
                >
                  Enter Workspace
                </button>
                <button
                  id="session-logout-btn"
                  onClick={logout}
                  className="px-4 py-2 bg-transparent hover:bg-rose-950 hover:text-rose-400 border border-slate-700 hover:border-rose-900 text-slate-400 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer"
                >
                  Clear Session
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="anonymous-status"
              className="text-xs text-slate-500 font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Not signed in. Select a workspace portal above to begin. Secured with static role routers.
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
