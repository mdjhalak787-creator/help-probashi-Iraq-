import React from 'react';
import { FileText, Clock, CheckCircle, Users, Bell, Briefcase, RefreshCw } from 'lucide-react';

export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div>
          <h1 className="text-xl font-bold">এজেন্ট ড্যাশবোর্ড</h1>
          <p className="text-sm text-slate-400">মুসফাক রাশেদ</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
            এজেন্ট কোড: AGT-2045
          </span>
        </div>
        <button className="p-2 bg-slate-700 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
          <p className="text-xs text-slate-400">মোট আবেদন</p>
          <h3 className="text-xl font-bold mt-1 text-blue-400">128</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
          <p className="text-xs text-slate-400">চলমান</p>
          <h3 className="text-xl font-bold mt-1 text-amber-400">43</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
          <p className="text-xs text-slate-400">সম্পন্ন</p>
          <h3 className="text-xl font-bold mt-1 text-emerald-400">85</h3>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <h2 className="text-sm font-semibold text-slate-400 mb-3">দ্রুত কার্যক্ষমতা</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 cursor-pointer hover:bg-slate-700/50">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg"><FileText className="w-5 h-5" /></div>
          <div><h4 className="text-sm font-medium">নতুন আবেদন</h4></div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 cursor-pointer hover:bg-slate-700/50">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg"><Clock className="w-5 h-5" /></div>
          <div><h4 className="text-sm font-medium">আবেদন সমূহ</h4></div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 cursor-pointer hover:bg-slate-700/50">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-lg"><Users className="w-5 h-5" /></div>
          <div><h4 className="text-sm font-medium">আমার ক্লায়েন্ট</h4></div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 cursor-pointer hover:bg-slate-700/50">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg"><Bell className="w-5 h-5" /></div>
          <div><h4 className="text-sm font-medium">নোটিফিকেশন</h4></div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 cursor-pointer hover:bg-slate-700/50">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-lg"><Briefcase className="w-5 h-5" /></div>
          <div><h4 className="text-sm font-medium">ট্রানজ্যাকশন</h4></div>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center space-x-3 cursor-pointer hover:bg-slate-700/50">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-lg"><RefreshCw className="w-5 h-5" /></div>
          <div><h4 className="text-sm font-medium">রিপোর্ট</h4></div>
        </div>
      </div>
    </div>
  );
}
