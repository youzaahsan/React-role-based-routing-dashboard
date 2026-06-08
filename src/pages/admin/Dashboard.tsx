import { Users, ShoppingBag, DollarSign, ShieldAlert, History, Activity, Calendar } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const { user } = useAuth();

  const auditLogs = [
    { id: 'l-1', action: 'User database authorized search', user: 'Sarah Connor', label: 'Security', date: 'Just now', badgeColor: 'bg-emerald-50 text-emerald-700' },
    { id: 'l-2', action: 'Modified master settings: SMTP servers configured', user: 'Sarah Connor', label: 'Infrastructure', date: '10 mins ago', badgeColor: 'bg-blue-50 text-blue-700 border border-blue-105' },
    { id: 'l-3', action: 'Created mock developer database container', user: 'Marcus Wright', label: 'Deployment', date: '1 hour ago', badgeColor: 'bg-amber-50 text-amber-700' },
    { id: 'l-4', action: 'Asset download request checklist approved', user: 'Elena Rostova', label: 'Commercial', date: '3 hours ago', badgeColor: 'bg-blue-50 text-blue-700 border border-blue-105' },
    { id: 'l-5', action: 'Password complexity keys raised to 256-bit AES standards', user: 'Sarah Connor', label: 'Cybersecurity', date: 'Yesterday', badgeColor: 'bg-rose-50 text-rose-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-blue-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight">
            Terminal Access Approved: {user?.name}
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Welcome back to the Monolith Secure Admin portal. You have complete root system privileges.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-lg border border-blue-500/20 text-xs font-semibold shrink-0 self-start md:self-auto">
          <Calendar className="w-4 h-4" />
          <span>Console Session Live</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monolithic Accounts"
          value="15,340"
          change="+12.4%"
          changeType="increase"
          icon={Users}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
        <ProductStatCard />
        <StatCard
          title="Commercial Valuation"
          value="$422,900"
          change="+16.8%"
          changeType="increase"
          icon={DollarSign}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Vulnerability Flags"
          value="0"
          change="No alerts"
          changeType="neutral"
          icon={ShieldAlert}
          iconBgColor="bg-slate-100"
          iconColor="text-slate-600"
        />
      </div>

      {/* Content Layout: Audit log timeline + System Health metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Log */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800 font-sans tracking-tight">Root Audit Log</h3>
            </div>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Export Logs</span>
          </div>

          <div className="space-y-6">
            {auditLogs.map((log, idx) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-2 shrink-0 border border-white outline outline-2 outline-blue-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-semibold leading-snug">{log.action}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="font-medium text-slate-500">{log.user}</span>
                    <span>•</span>
                    <span>{log.date}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-transparent ${log.badgeColor} self-center shrink-0`}>
                  {log.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Health Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Activity className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">System Core Indicators</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>CPU Load (AWS Core)</span>
                <span className="text-blue-600">32%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[32%] h-full bg-blue-600 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>Memory Cache Pool</span>
                <span className="text-amber-600">68%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[68%] h-full bg-amber-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>API Routing Latency</span>
                <span className="text-emerald-600">12ms - Optimal</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[12%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>All nodes live and active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom simple client-side stat reader to avoid react key warnings
function ProductStatCard() {
  return (
    <StatCard
      title="Hardware Products"
      value="1,480"
      change="+5.1%"
      changeType="increase"
      icon={ShoppingBag}
      iconBgColor="bg-amber-50"
      iconColor="text-amber-600"
    />
  );
}
