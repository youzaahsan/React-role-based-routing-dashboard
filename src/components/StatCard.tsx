import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'increase',
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
    >
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
          {title}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight font-sans">
          {value}
        </h3>
        {change && (
          <div className="flex items-center gap-1.5 pt-1">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                changeType === 'increase'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  : changeType === 'decrease'
                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {change}
            </span>
            <span className="text-xs text-slate-400">vs last month</span>
          </div>
        )}
      </div>

      <div className={`p-4 rounded-xl ${iconBgColor} ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="w-6 h-6" />
      </div>
    </motion.div>
  );
}
