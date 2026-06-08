import { CheckCircle2, ClipboardList, Briefcase, Calendar, Clock, Sparkles } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { mockTasks } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Tasks math from mockTasks state
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(t => t.status === 'Completed').length;
  const progressRatio = `${Math.round((completedTasks / totalTasks) * 100)}%`;
  const highPriorityCount = mockTasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-emerald-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight">
            Employee Workspace: {user?.name}
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            View allocated task logs, modify ticket checklists, and verify corporate department schedules.
          </p>
        </div>
        <button
          id="btn-employee-tasks-jump"
          onClick={() => navigate('/employee/tasks')}
          className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors self-start md:self-auto cursor-pointer"
        >
          <ClipboardList className="w-4 h-4" />
          <span>Fulfill Daily Tickets</span>
        </button>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Personal Task Pool"
          value={totalTasks}
          change="Available logs"
          changeType="neutral"
          icon={ClipboardList}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Checklist Completed"
          value={completedTasks}
          change={`${progressRatio} ratio`}
          changeType="increase"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="High Priority Tickets"
          value={highPriorityCount}
          change="Awaiting dispatch"
          changeType="neutral"
          icon={Clock}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
        <StatCard
          title="Clocked-In Duration"
          value="06:32 hrs"
          change="Shift ends in 01h 28m"
          changeType="increase"
          icon={Briefcase}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Grid: Shift Schedules + Real-Time Memo Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">Today's Operating Timeline</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg font-mono">09:00 AM</span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Operational Scrum Standup</h4>
                <p className="text-xs text-slate-500 mt-0.5">Brief synchronizing call on daily backup caches guidelines.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-lg font-mono">11:30 AM</span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Support Ticket Processing</h4>
                <p className="text-xs text-slate-500 mt-0.5">Focus period addressing shipping conflicts and Nginx static routing.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-lg font-mono">03:30 PM</span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Audit Sign-off Checklist</h4>
                <p className="text-xs text-slate-500 mt-0.5">Synchronize completed records with regional Admin coordinators.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Memo Board */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">Corporate Announcements</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-900">
              <span className="font-bold text-blue-900 block mb-1">🔐 Cyber Security Reminder</span>
              Our 2FA requirements have been successfully deployed. Make sure your account profile contact fields are fully populated on the Profile page.
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">☕ Summer Social Meeting</span>
              B2B Merchant alliances luncheon planned for June 12th. Come match with supporting teams!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
