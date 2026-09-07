import React from 'react';
import { Users, UserCheck, FileText, Shield, Settings, Database, HardDrive, BarChart2, ChevronRight, Bell } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h1 className="text-lg font-bold">সুপার-অ্যাডমিন ড্যাশবোর্ড</h1>
        <button className="p-2 bg-slate-700 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400">মোট ব্যবহারকারী</p>
          <h3 className="text-lg font-bold text-amber-400 mt-1">25,689</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400">মোট এজেন্ট</p>
          <h3 className="text-lg font-bold text-blue-400 mt-1">1,245</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400">মোট আবেদন</p>
          <h3 className="text-lg font-bold text-emerald-400 mt-1">18,745</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400">সার্ভার স্ট্যাটাস</p>
          <span className="inline-flex items-center px-2 py-0.5 mt-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span> সক্রিয়
          </span>
        </div>
      </div>

      {/* System Management */}
      <h2 className="text-sm font-semibold text-slate-400 mb-3">সিস্টেম ম্যানেজমেন্ট</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><Shield className="w-5 h-5 text-blue-400" /><span className="text-sm font-medium">সুপার অ্যাডমিন</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><UserCheck className="w-5 h-5 text-emerald-400" /><span className="text-sm font-medium">রোল ম্যানেজমেন্ট</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><Settings className="w-5 h-5 text-amber-400" /><span className="text-sm font-medium">সিস্টেম সেটিংস</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><Database className="w-5 h-5 text-purple-400" /><span className="text-sm font-medium">লগস</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><HardDrive className="w-5 h-5 text-cyan-400" /><span className="text-sm font-medium">ব্যাকআপ</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><BarChart2 className="w-5 h-5 text-rose-400" /><span className="text-sm font-medium">রিপোর্টস</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
