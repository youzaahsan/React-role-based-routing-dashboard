import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, Home, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AccessDenied() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleReturnToPortal = () => {
    if (user) {
      navigate(`/${user.role}`);
    } else {
      navigate('/');
    }
  };

  const handleLogoutAndHome = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Absolute glow design lines */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-slate-850 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative z-10"
      >
        <div className="w-16 h-16 rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 animate-bounce" />
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans mb-3">
          Access Denied
        </h1>

        <p className="text-sm text-rose-300 font-semibold bg-rose-500/10 inline-block px-3 py-1 rounded-full mb-6 max-w-xs mx-auto">
          Error 403: Forbidden Path
        </p>

        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The security layer blocks your profile from reading this directory. You logged in as <strong className="text-slate-200 capitalize font-medium">{user?.role || 'Guest'}</strong>, which does not hold sufficient credentials for this section of Monolith Inc.
        </p>

        {/* Action Group Buttons */}
        <div className="space-y-3">
          <button
            id="back-to-portal-btn"
            onClick={handleReturnToPortal}
            className="w-full h-11 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all duration-200 transform active:scale-[0.98] cursor-pointer shadow-lg"
          >
            <span>Return to {user ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Hub` : 'Login'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {user && (
            <button
              id="deny-logout-btn"
              onClick={handleLogoutAndHome}
              className="w-full h-11 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-750 text-slate-300 rounded-xl text-sm font-semibold transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Switch Accounts / Log Out</span>
            </button>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full h-11 flex items-center justify-center gap-2 bg-transparent text-slate-500 hover:text-slate-350 rounded-xl text-xs font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to Home Portal</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
