import { useState, FormEvent } from 'react';
import { mockUsers } from '../../utils/mockData';
import { User, UserRole } from '../../types';
import { Search, UserPlus, Trash2, ShieldCheck, Mail, Briefcase, Power, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // New User Form State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('employee');
  const [newUserTitle, setNewUserTitle] = useState('');
  const [newUserDept, setNewUserDept] = useState('');

  // Handle Search and Filter
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Toggle user active status
  const handleToggleStatus = (id: string) => {
    setUsers(curr => curr.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'inactive' : 'active' };
      }
      return u;
    }));
  };

  // Delete User
  const handleDeleteUser = (id: string) => {
    setUsers(curr => curr.filter(u => u.id !== id));
  };

  // Create User
  const handleCreateUser = (e: FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserTitle) return;

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?q=80&w=150&auto=format&fit=crop`,
      title: newUserTitle,
      department: newUserDept || 'General Operations',
      status: 'active'
    };

    setUsers([newUser, ...users]);
    resetForm();
  };

  const resetForm = () => {
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('employee');
    setNewUserTitle('');
    setNewUserDept('');
    setIsAddOpen(false);
  };

  const roleTags = {
    admin: 'bg-rose-50 border-rose-200 text-rose-700',
    seller: 'bg-amber-50 border-amber-200 text-amber-700',
    employee: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">System User Accounts</h2>
          <p className="text-sm text-slate-500">Monitor active personnel, delete profiles, or issue new security roles.</p>
        </div>
        <button
          id="btn-add-user"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision User</span>
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-users"
            type="text"
            placeholder="Search active users by full name or email directory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-slate-800"
          />
        </div>

        <div className="flex gap-2 shrink-0 overflow-x-auto">
          {['all', 'admin', 'seller', 'employee'].map((role) => (
            <button
              key={role}
              id={`filter-user-role-${role}`}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all whitespace-nowrap cursor-pointer ${
                roleFilter === role
                  ? 'bg-slate-900 border-slate-950 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {role === 'all' ? 'All Roles' : `${role}s`}
            </button>
          ))}
        </div>
      </div>

      {/* POPUP MODAL: Add User Form */}
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
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 z-10"
            >
              <h3 className="text-lg font-bold text-slate-850 tracking-tight font-sans mb-1">Provision Access Account</h3>
              <p className="text-xs text-slate-450 mb-4">Create a simulated user session to test role workflows instantly.</p>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                  <input
                    id="new-user-name"
                    required
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Thomas A. Anderson"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                  <input
                    id="new-user-email"
                    required
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g. neo@matrix.net"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Role Title</label>
                    <select
                      id="new-user-role"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 bg-slate-5/5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="admin">Administrator</option>
                      <option value="seller">Seller</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Corporate Department</label>
                    <input
                      id="new-user-dept"
                      type="text"
                      value={newUserDept}
                      onChange={(e) => setNewUserDept(e.target.value)}
                      placeholder="e.g. Operations"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Functional Job Designation</label>
                  <input
                    id="new-user-title"
                    required
                    type="text"
                    value={newUserTitle}
                    onChange={(e) => setNewUserTitle(e.target.value)}
                    placeholder="e.g. Lead Technical Analyst"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
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
                    id="new-user-submit"
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Create Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TABLE DATA LIST CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Security Level</th>
                <th className="px-6 py-4">Department & Job</th>
                <th className="px-6 py-4">System Status</th>
                <th className="px-6 py-4 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user_row) => (
                  <motion.tr 
                    key={user_row.id} 
                    id={`row-user-${user_row.id}`}
                    layout
                    className="hover:bg-slate-55/6 transition-colors"
                  >
                    {/* User profile details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user_row.avatar} 
                          alt={user_row.name} 
                          className="w-10 h-10 rounded-full border border-slate-100 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">{user_row.name}</p>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{user_row.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Tag */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleTags[user_row.role]}`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="capitalize">{user_row.role}</span>
                      </span>
                    </td>

                    {/* Job Designation */}
                    <td className="px-6 py-4">
                      <div className="text-slate-650">
                        <p className="font-medium text-slate-700">{user_row.title}</p>
                        <div className="flex items-center gap-0.5 text-xs text-slate-450 mt-0.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{user_row.department || 'N/A'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Toggle Badge */}
                    <td className="px-6 py-4">
                      <button
                        id={`toggle-status-${user_row.id}`}
                        onClick={() => handleToggleStatus(user_row.id)}
                        title="Click to toggle account status"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                          user_row.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {user_row.status === 'active' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Controls Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          id={`btn-toggle-${user_row.id}`}
                          onClick={() => handleToggleStatus(user_row.id)}
                          title="Power Toggle User State"
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button
                          id={`btn-delete-${user_row.id}`}
                          onClick={() => handleDeleteUser(user_row.id)}
                          title="Revoke and Delete Access"
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400 font-sans">
                    No authorized users matching filters were located.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-450">
          <span>Displaying {filteredUsers.length} total staff profiles</span>
          <span className="font-semibold">Simulated Environment</span>
        </div>
      </div>
    </div>
  );
}
