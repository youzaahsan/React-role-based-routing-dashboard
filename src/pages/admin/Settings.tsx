import { useState, FormEvent } from 'react';
import { Save, ShieldAlert, Key, Database, MailCheck, Globe, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  // System states
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [requireTwoFactor, setRequireTwoFactor] = useState(true);
  const [debugLogEnabled, setDebugLogEnabled] = useState(false);
  const [databaseSchemaName, setDatabaseSchemaName] = useState('prod-monolithic-relational-v2');
  const [encryptionStandard, setEncryptionStandard] = useState('AES-256-GCM');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [purging, setPurging] = useState(false);

  // Trigger Save Notification
  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePurgeCache = () => {
    setPurging(true);
    setTimeout(() => {
      setPurging(false);
      alert('Mock Redis cache registry cleared successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">System Settings Overview</h2>
        <p className="text-sm text-slate-500 font-sans">Toggle security keys, manage database caches, and customize session routing parameters.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* CARD 1: CYBERSECURITY STRATEGY */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Key className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">Security & Encryption Keys</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-semibold text-slate-700 block">Enforce Multi-Factor Authentication</label>
                <span className="text-xs text-slate-450 block">Require 2FA codes for Admin and Commercial Seller profiles.</span>
              </div>
              <button
                type="button"
                id="toggle-2fa"
                onClick={() => setRequireTwoFactor(!requireTwoFactor)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer outline-none ${
                  requireTwoFactor ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    requireTwoFactor ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Session Logout (Minutes)</label>
                <input
                  id="session-timeout-input"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">System Cipher Algorithm</label>
                <select
                  id="encryption-standard-input"
                  value={encryptionStandard}
                  onChange={(e) => setEncryptionStandard(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                >
                  <option value="AES-128-CBC">AES-128-CBC (Legacy compatibility)</option>
                  <option value="AES-256-GCM">AES-256-GCM (Highly Secure)</option>
                  <option value="ChaCha20-Poly1305">ChaCha20-Poly1305 (Ultra latency)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: SERVER DB SETTINGS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Database className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 font-sans tracking-tight">Database & Static Caching Pools</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Root Storage Directory Target</label>
              <input
                id="database-schema-input"
                type="text"
                value={databaseSchemaName}
                onChange={(e) => setDatabaseSchemaName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <label className="text-sm font-semibold text-slate-700 block">Deploy Debug Telemetry Logs</label>
                <span className="text-xs text-slate-450 block">Renders detailed memory footprint variables directly in the console.</span>
              </div>
              <button
                type="button"
                id="toggle-debug"
                onClick={() => setDebugLogEnabled(!debugLogEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer outline-none ${
                  debugLogEnabled ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    debugLogEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                id="btn-purge-cache"
                onClick={handlePurgeCache}
                className="inline-flex items-center gap-2 px-4 py-2 border border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                <RefreshCcw className={`w-4 h-4 ${purging ? 'animate-spin' : ''}`} />
                <span>{purging ? 'Purging Registry...' : 'Purge Redis Web-Static Caches'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* FEEDBACK STATUS AND ACTION TRIGGERS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg font-semibold"
              >
                <MailCheck className="w-4 h-4" />
                <span>Simulated settings saved securely!</span>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            id="btn-save-settings"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold cursor-pointer shadow-md transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Store Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
