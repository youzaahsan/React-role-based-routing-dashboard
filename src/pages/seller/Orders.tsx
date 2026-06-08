import { useState } from 'react';
import { mockOrders } from '../../utils/mockData';
import { Order } from '../../types';
import { Search, RotateCcw, Truck, CheckCircle2, ClipboardPlus, RefreshCw, XSquare, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Order['status']>('All');

  // Interactive state-updating function
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(curr => curr.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  // Add dummy order simulation
  const simulateNewOrder = () => {
    const clients = ['Wanda Maximoff', 'Peter Parker', 'Tony Stark', 'Steve Rogers', 'Natasha Romanoff'];
    const randomClient = clients[Math.floor(Math.random() * clients.length)];
    const prices = [189.99, 349.50, 129.00, 59.99, 499.99];
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    
    const newOrder: Order = {
      id: `ORD-${9000 + Math.floor(Math.random() * 950)}`,
      customerName: randomClient,
      date: new Date().toISOString().split('T')[0],
      total: randomPrice,
      status: 'Pending',
      itemsCount: Math.floor(Math.random() * 3) + 1
    };

    setOrders([newOrder, ...orders]);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) || 
                          o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getBadgeColors = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Active Orders Center</h2>
          <p className="text-sm text-slate-500 font-sans">Inspect, fulfill, dispatch, or cancel corporate client invoices.</p>
        </div>
        <button
          id="btn-simulate-order"
          onClick={simulateNewOrder}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Simulate Customer Order</span>
        </button>
      </div>

      {/* SEARCH AND TABS */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-orders"
            type="text"
            placeholder="Search orders by Client Name, Invoice Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans focus:bg-white focus:ring-1 focus:ring-amber-505 focus:outline-none transition-all text-slate-800"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto shrink-0 select-none">
          {(['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'] as const).map((status) => (
            <button
              key={status}
              id={`filter-order-status-${status}`}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-amber-600 border-amber-650 text-white shadow-sm font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS DATA LAYOUT */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Checkout Date</th>
                <th className="px-6 py-4">Package Items</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4">Pricing Total</th>
                <th className="px-6 py-4 text-right">Workflow State Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <motion.tr 
                    key={o.id} 
                    id={`row-order-${o.id}`}
                    layout
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-xs text-amber-700">
                      {o.id}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {o.customerName}
                    </td>

                    <td className="px-6 py-4 text-slate-500 font-sans">
                      {o.date}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <span className="font-medium">{o.itemsCount}x</span> products itemized
                    </td>

                    <td className="px-6 py-4 font-sans">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${getBadgeColors(o.status)}`}>
                        {o.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800 font-sans">
                      ${o.total.toFixed(2)}
                    </td>

                    {/* Operational action toggles */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 select-none">
                        {o.status === 'Pending' && (
                          <button
                            id={`btn-ship-order-${o.id}`}
                            onClick={() => updateOrderStatus(o.id, 'Shipped')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            title="Dispatch and Ship items"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Ship</span>
                          </button>
                        )}

                        {o.status === 'Shipped' && (
                          <button
                            id={`btn-deliver-order-${o.id}`}
                            onClick={() => updateOrderStatus(o.id, 'Delivered')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            title="Mark as Received"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Deliver</span>
                          </button>
                        )}

                        {o.status !== 'Delivered' && o.status !== 'Cancelled' && (
                          <button
                            id={`btn-cancel-order-${o.id}`}
                            onClick={() => updateOrderStatus(o.id, 'Cancelled')}
                            className="inline-flex items-center gap-1 p-1.5 bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            title="Cancel Order"
                          >
                            <XSquare className="w-4 h-4" />
                          </button>
                        )}

                        {(o.status === 'Cancelled' || o.status === 'Delivered') && (
                          <button
                            id={`btn-reset-order-${o.id}`}
                            onClick={() => updateOrderStatus(o.id, 'Pending')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            title="Re-open order parameters"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Re-open</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 font-sans">
                    No matching orders inside the registry system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-450">
          <span>Displaying {filteredOrders.length} active consumer shipments</span>
          <span className="font-semibold">Simulated Transaction Log</span>
        </div>
      </div>
    </div>
  );
}
