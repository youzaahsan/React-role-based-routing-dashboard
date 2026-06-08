import { useState, FormEvent } from 'react';
import { mockProducts } from '../../utils/mockData';
import { Product } from '../../types';
import { Search, Plus, Trash2, ArrowUpDown, ChevronDown, CheckCircle, AlertTriangle, XCircle, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Create Product States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('99.99');
  const [stock, setStock] = useState('10');
  const [category, setCategory] = useState('Hardware');

  // Available unique categories in data
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Adjust Stock Levels
  const adjustStock = (id: string, amount: number) => {
    setProducts(curr => curr.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + amount);
        let status: Product['status'] = 'In Stock';
        if (newStock === 0) status = 'Out of Stock';
        else if (newStock <= 10) status = 'Low Stock';
        
        return {
          ...p,
          stock: newStock,
          status
        };
      }
      return p;
    }));
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    setProducts(curr => curr.filter(p => p.id !== id));
  };

  // Create Product Form Submission
  const handleCreateProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !sku) return;

    const parsedPrice = parseFloat(price) || 0;
    const parsedStock = parseInt(stock, 10) || 0;

    let status: Product['status'] = 'In Stock';
    if (parsedStock === 0) status = 'Out of Stock';
    else if (parsedStock <= 10) status = 'Low Stock';

    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name,
      sku,
      price: parsedPrice,
      stock: parsedStock,
      category,
      status
    };

    setProducts([newProduct, ...products]);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setSku('');
    setPrice('99.99');
    setStock('10');
    setCategory('Hardware');
    setIsAddOpen(false);
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>In Stock</span>
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Low Stock</span>
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Out of Stock</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Active Product Warehouse</h2>
          <p className="text-sm text-slate-500 font-sans">Manage available physical stock count levels and billing price records.</p>
        </div>
        <button
          id="btn-add-product"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* FILTER BANNER */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-products"
            type="text"
            placeholder="Search products by SKU key or product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-slate-800"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-product-cat-${cat}`}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-slate-900 border-slate-950 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COMPONENT MODAL: Add Product */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 z-10"
            >
              <h3 className="text-lg font-bold text-slate-850 tracking-tight font-sans mb-1">List New Inventory Product</h3>
              <p className="text-xs text-slate-450 mb-4">Adds items directly to the database for sellable product verification.</p>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-550 mb-1">Product Title</label>
                  <input
                    id="new-product-name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. 4K Ultra OLED Projection Lens"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-550 mb-1">SKU Code</label>
                    <input
                      id="new-product-sku"
                      required
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="e.g. PN-4K-LENS"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-550 mb-1">Category</label>
                    <select
                      id="new-product-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Hardware">Hardware</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Audio">Audio</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-550 mb-1">Unit Price ($)</label>
                    <input
                      id="new-product-price"
                      required
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-550 mb-1">Initial Stock</label>
                    <input
                      id="new-product-stock"
                      required
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="new-product-submit"
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Add to Stock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRODUCTS DISPLAY LIST */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                <th className="px-6 py-4">Hardware Item</th>
                <th className="px-6 py-4">SKU Code</th>
                <th className="px-6 py-4">Monetary Price</th>
                <th className="px-6 py-4">Database Inventory</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-right">Delete Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <motion.tr 
                    key={p.id} 
                    id={`row-product-${p.id}`}
                    layout
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-850 truncate max-w-[240px]">{p.name}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 mt-1">
                          <Tag className="w-3 h-3 text-blue-500" />
                          <span>{p.category}</span>
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">
                      {p.sku}
                    </td>

                    <td className="px-6 py-4 font-sans font-semibold text-slate-800">
                      ${p.price.toFixed(2)}
                    </td>

                    {/* Stock level modification controls */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <button
                          id={`btn-stock-dec-${p.id}`}
                          onClick={() => adjustStock(p.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs select-none transition-colors"
                        >
                          -
                        </button>
                        <span id={`stock-val-${p.id}`} className="font-semibold text-slate-800 w-8 text-center">{p.stock} units</span>
                        <button
                          id={`btn-stock-inc-${p.id}`}
                          onClick={() => adjustStock(p.id, 1)}
                          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs select-none transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(p.status)}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        id={`btn-delete-product-${p.id}`}
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete product item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 font-sans">
                    No products matching search filters were found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-450">
          <span>Active Warehouse Registry Container</span>
          <span className="font-semibold">Simulated Inventory Database</span>
        </div>
      </div>
    </div>
  );
}
