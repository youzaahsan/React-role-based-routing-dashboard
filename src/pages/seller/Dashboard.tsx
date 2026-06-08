import { TrendingUp, ShoppingBag, Banknote, Clock, ArrowRight, ArrowUpRight, BarChart3, Star } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { mockOrders } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SellerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Simple statistics calculations from mockOrders
  const totalOrdersCount = mockOrders.length;
  const totalRevenue = mockOrders.reduce((acc, current) => current.status !== 'Cancelled' ? acc + current.total : acc, 0);
  const pendingOrdersCount = mockOrders.filter(o => o.status === 'Pending').length;

  return (
    <div className="space-y-8">
      {/* Dynamic Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-amber-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight font-sans">
            Merchant Desk Portal: {user?.name}
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Monitor active retail checkouts, print packaging shipping sheets, and inspect sales revenue analytics.
          </p>
        </div>
        <button
          id="btn-seller-orders-jump"
          onClick={() => navigate('/seller/orders')}
          className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>Review Orders List</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monolithic Store Revenue"
          value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          change="+18.4%"
          changeType="increase"
          icon={Banknote}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Consolidated Orders"
          value={totalOrdersCount}
          change="+4.2%"
          changeType="increase"
          icon={ShoppingBag}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Pending Packaging"
          value={pendingOrdersCount}
          change="Needs processing"
          changeType="neutral"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Merchant Rating"
          value="4.9 / 5.0"
          change="Master Tier"
          changeType="increase"
          icon={Star}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>

      {/* Layout grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Pending Orders */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-150 mb-5">
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">E-Commerce Processing Status</h3>
            <button 
              id="view-all-orders-lnk"
              onClick={() => navigate('/seller/orders')} 
              className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View Order Processing</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {mockOrders.slice(0, 4).map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-205 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{order.id}</span>
                    <span className="text-sm font-semibold text-slate-800">{order.customerName}</span>
                  </div>
                  <div className="text-xs text-slate-450 mt-1">
                    <span>{order.date}</span>
                    <span> • </span>
                    <span>{order.itemsCount} package items</span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="font-bold text-slate-800 text-sm font-sans">${order.total.toFixed(2)}</p>
                    <span className={`inline-block text-[10px] uppercase font-bold text-slate-400 mt-1`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sales Channel Chart Breakdown Mock */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-150">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">Active Sales Channels</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-550">
                <span>Enterprise Monolith Website</span>
                <span className="text-slate-800 font-bold">74% ($312.9k)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[74%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-550">
                <span>Direct Merchant Integrations</span>
                <span className="text-slate-800 font-bold">18% ($76.1k)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[18%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-550">
                <span>B2B Affiliate Partners</span>
                <span className="text-slate-800 font-bold">8% ($33.9k)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[8%]" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
            📦 <strong>Fulfillment Priority Alert:</strong> You have {pendingOrdersCount} customer packages currently marked as Pending. Dispatch them within the next shifts to maintain top-tier ratings.
          </div>
        </div>
      </div>
    </div>
  );
}
