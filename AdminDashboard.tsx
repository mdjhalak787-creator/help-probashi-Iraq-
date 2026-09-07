import React from 'react';
import { Users, UserCheck, FileText, Clock, ChevronRight, Bell } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h1 className="text-lg font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
        <button className="p-2 bg-slate-700 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Users className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400">মোট ব্যবহারকারী</p>
              <h3 className="text-lg font-bold text-slate-100">12,548</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><UserCheck className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400">মোট এজেন্ট</p>
              <h3 className="text-lg font-bold text-slate-100">523</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><FileText className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400">মোট আবেদন</p>
              <h3 className="text-lg font-bold text-slate-100">8,965</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"><Clock className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400">চলমান আবেদন</p>
              <h3 className="text-lg font-bold text-slate-100">2,145</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Management Menu */}
      <h2 className="text-sm font-semibold text-slate-400 mb-3">দ্রুত কার্যক্র্ম</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><Users className="w-5 h-5 text-blue-400" /><span className="text-sm font-medium">ব্যবহারকারী ব্যবস্থাপনা</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><UserCheck className="w-5 h-5 text-emerald-400" /><span className="text-sm font-medium">এজেন্ট ব্যবস্থাপনা</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><FileText className="w-5 h-5 text-amber-400" /><span className="text-sm font-medium">আবেদন ব্যবস্থাপনা</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
        <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700/50">
          <div className="flex items-center space-x-3"><Bell className="w-5 h-5 text-purple-400" /><span className="text-sm font-medium">নোটিশ প্রকাশ</span></div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
