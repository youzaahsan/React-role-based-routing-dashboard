import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Phone, Award, Shield, User, MapPin, Save, Briefcase, Mail, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const { user } = useAuth();

  // Profile editable states
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 019-2834');
  const [emergencyContact, setEmergencyContact] = useState('John Connor (Son) - +1 (555) 019-9000');
  const [biography, setBiography] = useState(
    'Operations Analyst with a background in system logs diagnostics and network failover strategy planning. Dedicated to keeping modular system containers fully synchronized.'
  );
  const [preferredShell, setPreferredShell] = useState('zsh / OhMyZsh');
  const [isSaved, setIsSaved] = useState(false);

  // Trigger simulated success saves
  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">My Personnel Profile</h2>
        <p className="text-sm text-slate-500 font-sans">Manage your contact information, credentials, and shift preference configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Profile Card Left */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
          <div className="relative inline-block">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-md object-cover mx-auto"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Active on network" />
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-800 tracking-tight font-sans">{user.name}</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase">{user.title}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 text-left text-sm text-slate-600">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{user.department || 'Corporate'}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Monolith Headquarters, Room 402</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-450 uppercase font-bold text-emerald-800 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Workspace Security Clearance</span>
            </div>
            <p className="text-xs text-slate-600 font-semibold font-mono">LEVEL-2-REGIONAL</p>
          </div>
        </div>

        {/* Profile Form Editing Right */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
            <User className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">Interactive Personnel Record</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Employment Record Biography</label>
              <textarea
                id="profile-bio-input"
                required
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 h-24 text-left resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Direct Phone Line</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="profile-phone-input"
                    required
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-55/6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Primary Shell Command Environment</label>
                <select
                  id="profile-shell-input"
                  value={preferredShell}
                  onChange={(e) => setPreferredShell(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="zsh / OhMyZsh">zsh / OhMyZsh (Default)</option>
                  <option value="bash Standard">bash Standard</option>
                  <option value="Windows PowerShell Core">Windows PowerShell Core</option>
                  <option value="fish Shell Modern">fish Shell Modern</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Emergency Contact Details</label>
              <input
                id="profile-emergency-input"
                required
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Read-only Shift card */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-450 uppercase block font-bold mb-0.5">Assigned Shift Hours</span>
                <span className="text-slate-850 font-bold">09:00 AM - 05:00 PM EST</span>
              </div>
              <div>
                <span className="text-slate-450 uppercase block font-bold mb-0.5">Standard Base Office Location</span>
                <span className="text-slate-850 font-bold">Monolith Silicon Valley HQ</span>
              </div>
            </div>

            {/* Save Buttons & indicators */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                {isSaved && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-250 px-3 py-1.5 rounded-lg font-semibold"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Personnel record saved securely!</span>
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                id="btn-save-profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold cursor-pointer shadow-md transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Store Workspace Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
