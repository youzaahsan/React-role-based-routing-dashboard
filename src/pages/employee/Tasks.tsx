import { useState, FormEvent } from 'react';
import { mockTasks } from '../../utils/mockData';
import { Task } from '../../types';
import { Search, Plus, Trash2, CheckCircle2, Circle, Clock, ClipboardList, AlertTriangle, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Create Task states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('Medium');
  const [deadline, setDeadline] = useState('2026-06-15');

  // Add simulated task
  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask: Task = {
      id: `TSK-${Date.now()}`,
      title,
      description: desc || 'No additional description provided.',
      priority,
      status: 'To Do',
      deadline
    };

    setTasks([newTask, ...tasks]);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setPriority('Medium');
    setDeadline('2026-06-15');
    setIsAddOpen(false);
  };

  // Toggle task status
  const cycleTaskStatus = (id: string) => {
    setTasks(curr => curr.map(t => {
      if (t.id === id) {
        let newStatus: Task['status'] = 'To Do';
        if (t.status === 'To Do') newStatus = 'In Progress';
        else if (t.status === 'In Progress') newStatus = 'Completed';
        
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  // Checkbox complete shortcut
  const toggleCompleteSecret = (id: string) => {
    setTasks(curr => curr.map(t => {
      if (t.id === id) {
        return { 
          ...t, 
          status: t.status === 'Completed' ? 'To Do' : 'Completed' 
        };
      }
      return t;
    }));
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    setTasks(curr => curr.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityBadgeColors = (priorityVal: Task['priority']) => {
    switch (priorityVal) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Low':
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Active Duty Ticket Board</h2>
          <p className="text-sm text-slate-500">Monitor deadlines, track work status, and record achievements.</p>
        </div>
        <button
          id="btn-add-task"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post Internal Ticket</span>
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-strong justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-tasks"
            type="text"
            placeholder="Search tickets by keywords or full descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans focus:bg-white focus:ring-1 focus:ring-emerald-505 focus:outline-none transition-all text-slate-800"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto shrink-0 select-none">
          {['All', 'To Do', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              id={`filter-task-${status.replace(/\s+/g, '-')}`}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? 'bg-emerald-600 border-emerald-650 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* DETAILED ADD TASK POPUP DIALOG */}
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
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 z-10 animate-fade-in"
            >
              <h3 className="text-lg font-bold text-slate-850 tracking-tight font-sans mb-1">Issue Team Operations Ticket</h3>
              <p className="text-xs text-slate-450 mb-4">Post a task immediately to keep the department in sync.</p>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ticket Summary</label>
                  <input
                    id="new-task-title"
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Purge cache on static routers"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contextual Description</label>
                  <textarea
                    id="new-task-desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Provide troubleshooting parameters..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 h-18 text-left resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priority</label>
                    <select
                      id="new-task-priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Task['priority'])}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deadline Date</label>
                    <input
                      id="new-task-deadline"
                      required
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="new-task-submit"
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors animate-pulse"
                  >
                    Post Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TASK LIST DISPLAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => {
            const isCompleted = t.status === 'Completed';
            const isInProgress = t.status === 'In Progress';
            
            return (
              <motion.div
                key={t.id}
                id={`card-task-${t.id}`}
                layout
                className={`p-6 bg-white border rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-305 transition-all duration-300 relative group ${
                  isCompleted ? 'border-emerald-250 bg-emerald-50/5' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top line checklist shortcut + status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      id={`btn-toggle-done-${t.id}`}
                      onClick={() => toggleCompleteSecret(t.id)}
                      className={`flex items-center gap-1.5 font-bold text-xs select-none cursor-pointer p-1 rounded-lg ${
                        isCompleted ? 'text-emerald-700' : 'text-slate-450 hover:text-blue-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 shrink-0" />}
                      <span className="font-mono">{t.id}</span>
                    </button>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getPriorityBadgeColors(t.priority)}`}>
                      {t.priority}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold font-sans tracking-tight mb-2 ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {t.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-6 ${isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.description}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-450">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Due: {t.deadline}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Status switcher action button */}
                    <button
                      id={`cycle-task-status-${t.id}`}
                      onClick={() => cycleTaskStatus(t.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : isInProgress
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {isInProgress ? <PlayCircle className="w-3.5 h-3.5" /> : null}
                      <span>{t.status}</span>
                    </button>

                    <button
                      id={`delete-task-${t.id}`}
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Remove task card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 text-slate-450 bg-white border border-slate-205 rounded-2xl">
            No active operations tickets found. Create one above!
          </div>
        )}
      </div>
    </div>
  );
}
