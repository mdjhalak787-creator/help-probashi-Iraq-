import { useEffect, useState } from 'react';
import { 
  Bell, BriefcaseBusiness, FileCheck2, 
  Home as HomeIcon, Search, Users, User, 
  ArrowLeft, MapPin, Phone, Mail, ChevronRight, Settings, LogOut, FileText, Send, Smile
} from 'lucide-react';
import './App.css';

type Page = 'home' | 'social' | 'jobs' | 'notices' | 'passport' | 'search' | 'profile' | 'track' | 'chat';

type Post = { id: string; author_name: string; author_role: string; content: string; time: string; likes_count: number; comments_count: number };
type Job = { company: string; title: string; location: string; salary: string; description: string };

const jobs: Job[] = [
  { company: 'Al-Nahrain Transport Co.', title: 'ড্রাইভার (Driver)', location: 'বাগদাদ, ইরাক', salary: 'IQD 750,000 - 900,000', description: 'হেভি ভেহিকেলে অভিজ্ঞ ড্রাইভার প্রয়োজন।' },
  { company: 'Al-Basra Engineering', title: 'সেলস এক্সিকিউটিভ', location: 'বসরা, ইরাক', salary: 'IQD 800,000 - 1,000,000', description: 'ইন্ডাস্ট্রিয়াল সেলস ও মার্কেটিংয়ে অভিজ্ঞ।' },
  { company: 'Iraq Bangla Trading', title: 'সেলস এক্সিকিউটিভ', location: 'এরবিল, ইরাক', salary: 'IQD 700,000 - 850,000', description: 'জেনারেল ট্রেডিংয়ের জন্য কর্মী আবশ্যক।' },
  { company: 'Al-Safa Construction', title: 'সহায়ক (Helper)', location: 'নাজাফ, ইরাক', salary: 'IQD 550,000 - 650,000', description: 'নির্মাণ প্রকল্পে সাধারণ কাজ।' }
];

const notices = [
  { title: 'পাসপোর্ট নবায়ন সংক্রান্ত গুরুত্বপূর্ণ নোটিশ', date: '০৫ মে, ২০২৬', tag: 'গুরুত্বপূর্ণ' },
  { title: 'ইরাকে নতুন ভিসা নীতিমালা', date: '৩০ এপ্রিল, ২০২৬', tag: 'জরুরি' },
  { title: 'শ্রম মন্ত্রণালয়ের নির্দেশনা', date: '২৮ এপ্রিল, ২০২৬', tag: 'সরকারি' },
  { title: 'ছুটির দিনের তালিকা - ২০২৬', date: '২৫ এপ্রিল, ২০২৬', tag: 'সাধারণ' }
];

const initialPosts: Post[] = [
  { id: 'seed-1', author_name: 'Rashid Alom', author_role: 'সদস্য', content: 'আজ ইরাকে বৃষ্টি, আলহামদুলিল্লাহ 🌧️ সবাই কেমন আছেন?', time: '22m', likes_count: 128, comments_count: 14 },
  { id: 'seed-2', author_name: 'Sujon Ahmed', author_role: 'মডারেটর', content: 'নতুন কাজ শুরু করলাম, দোয়া করবেন 🙏', time: '1h', likes_count: 45, comments_count: 5 }
];

const navItems = [
  { page: 'home' as Page, label: 'হোম', icon: HomeIcon },
  { page: 'social' as Page, label: 'সোশ্যাল', icon: Users },
  { page: 'jobs' as Page, label: 'সেবা', icon: BriefcaseBusiness, isCenter: true },
  { page: 'chat' as Page, label: 'চ্যাট', icon: Search }, // চ্যাট বা সাপোর্ট
  { page: 'profile' as Page, label: 'প্রোফাইল', icon: User }
];

// ১. স্প্ল্যাশ স্ক্রিন কম্পোনেন্ট
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <div onClick={onFinish} className="min-h-screen bg-[#0b1c3c] flex flex-col justify-between items-center text-white p-6 relative cursor-pointer">
      <div className="absolute top-4 left-4 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
        ট্যাপ করে ভেতরে প্রবেশ করুন
      </div>

      <div className="flex flex-col items-center justify-center flex-1 text-center mt-12">
        <div className="w-28 h-28 rounded-full border-4 border-white/20 flex items-center justify-center mb-6 shadow-2xl bg-white/5 backdrop-blur-md">
          <Users className="w-16 h-16 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">ইরাক প্রবাসী হেল্প</h1>
        <h2 className="text-xl font-medium text-slate-300 mb-2">Iraq Probashi Help</h2>
        <p className="text-lg text-slate-300 mb-6">مساعدة للمغتربين في العراق</p>
        <div className="w-16 h-1 bg-emerald-500 rounded-full mb-6"></div>
        <p className="text-base font-medium text-slate-200">প্রবাসীর পাশে, সব সময়</p>
        <p className="text-sm text-slate-400">Always beside the expatriates</p>
      </div>

      <div className="w-full flex justify-between items-end pb-4 px-2">
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <div className="w-8 h-5 rounded bg-[#006a4e] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#f42a41]"></div>
          </div>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <div className="w-8 h-5 rounded flex flex-col overflow-hidden">
            <div className="h-1/3 bg-red-600"></div>
            <div className="h-1/3 bg-white text-[4px] text-center font-bold text-green-700">الله</div>
            <div className="h-1/3 bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ২. প্রফাইল পেজ কম্পোনেন্ট
function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-900 pb-24 text-white">
      <div className="bg-slate-800 px-4 py-4 flex items-center justify-between border-b border-slate-700">
        <button className="p-1 hover:bg-slate-700 rounded-full"><ArrowLeft className="w-6 h-6 text-slate-300" /></button>
        <h1 className="text-lg font-semibold">আমার প্রোফাইল</h1>
        <button className="p-1 hover:bg-slate-700 rounded-full relative"><Bell className="w-6 h-6 text-slate-300" /><span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span></button>
      </div>

      <div className="p-4">
        <div className="bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-700/50 mb-4 flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500" />
          <div>
            <h2 className="text-xl font-bold text-white mb-1">মুসফাক রাশেদ</h2>
            <p className="text-sm text-slate-300 flex items-center gap-1.5 mb-1"><MapPin className="w-4 h-4 text-emerald-400" /> Baghdad, Iraq</p>
            <p className="text-sm text-slate-300 flex items-center gap-1.5 mb-1"><Phone className="w-4 h-4 text-emerald-400" /> +964 770 123 4567</p>
            <p className="text-xs text-slate-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-400" /> rashed.bd1995@gmail.com</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 divide-y divide-slate-700/50">
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50"><div className="flex items-center gap-3"><User className="w-5 h-5 text-emerald-400" /><span className="font-medium text-slate-200">ব্যক্তিগত তথ্য</span></div><ChevronRight className="w-5 h-5 text-slate-400" /></button>
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50"><div className="flex items-center gap-3"><FileText className="w-5 h-5 text-emerald-400" /><span className="font-medium text-slate-200">আমার আবেদন সমূহ</span></div><ChevronRight className="w-5 h-5 text-slate-400" /></button>
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50"><div className="flex items-center gap-3"><Bell className="w-5 h-5 text-emerald-400" /><span className="font-medium text-slate-200">নোটিফিকেশন সেটিংস</span></div><ChevronRight className="w-5 h-5 text-slate-400" /></button>
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50"><div className="flex items-center gap-3"><Globe className="w-5 h-5 text-emerald-400" /><span className="font-medium text-slate-200">ভাষা / Language</span></div><span className="text-sm text-emerald-400 font-medium">বাংলা</span></button>
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50"><div className="flex items-center gap-3"><Settings className="w-5 h-5 text-emerald-400" /><span className="font-medium text-slate-200">সেটিংস</span></div><ChevronRight className="w-5 h-5 text-slate-400" /></button>
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-red-500/10 text-red-400"><div className="flex items-center gap-3"><LogOut className="w-5 h-5" /><span className="font-medium">লগ আউট</span></div></button>
        </div>
      </div>
    </div>
  );
}

// ৩. চ্যাট সাপোর্ট কম্পোনেন্ট
function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-900 pb-24 text-white flex flex-col">
      <div className="bg-slate-800 px-4 py-4 flex items-center gap-3 border-b border-slate-700">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Support" className="w-10 h-10 rounded-full border border-emerald-500" />
        <div>
          <h3 className="font-bold text-sm">সাপোর্ট টিম</h3>
          <span className="text-xs text-emerald-400 flex items-center gap-1">● অনলাইন</span>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-slate-800 p-3 rounded-xl max-w-[80%] text-sm">আসসালামু আলাইকুম, কীভাবে সাহায্য করতে পারি?</div>
        <div className="bg-emerald-700 p-3 rounded-xl max-w-[80%] ml-auto text-sm">আমি পাসপোর্ট নবায়ন করতে চাই, কি কি লাগবে?</div>
        <div className="bg-slate-800 p-3 rounded-xl max-w-[80%] text-sm">জী, আপনার পাসপোর্ট, আইডি কার্ড এবং ছবি লাগবে। বিস্তারিত নিচে দেখুন।</div>
      </div>
      <div className="p-3 bg-slate-800 flex items-center gap-2 fixed bottom-16 left-0 right-0 border-t border-slate-700">
        <Smile className="w-6 h-6 text-slate-400" />
        <input type="text" placeholder="মেসেজ লিখুন..." className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none" />
        <button className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white"><Send className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

// মূল অ্যাপ কম্পোনেন্ট
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    showSplash ? <SplashScreen onFinish={() => setShowSplash(false)} /> :
    <div className="app-container min-h-screen bg-slate-900 text-white pb-20">
      {/* Header */}
      <header className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center border-b border-slate-700">
        <h1 className="text-base font-bold">প্রবাসী হেল্প কেয়ার ইরাক</h1>
        <input 
          type="text" 
          placeholder="সার্চ করুন..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && searchQuery) setPage('search'); }}
          className="bg-slate-900 px-3 py-1.5 rounded-lg text-xs border border-slate-700 text-white focus:outline-none"
        />
      </header>

      {/* Main Area */}
      <main className="p-4">
        {page === 'home' && (
          <div>
            <div className="bg-gradient-to-r from-teal-800 to-slate-800 p-4 rounded-2xl mb-4 border border-slate-700">
              <h2 className="text-lg font-bold mb-1">স্বাগতম, মুসফাক রাশেদ</h2>
              <p className="text-xs text-slate-300">Baghdad, Iraq</p>
              <div className="mt-3 p-3 bg-white/10 rounded-xl backdrop-blur-md text-xs">
                প্রবাসীর সেবা আমাদের অঙ্গীকার, আমরা আছি আপনার পাশে।
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div onClick={() => setPage('jobs')} className="bg-slate-800 p-4 rounded-xl text-center cursor-pointer border border-slate-700/50 hover:bg-slate-700">
                <BriefcaseBusiness className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <span className="text-xs font-medium">চাকরি (Jobs)</span>
              </div>
              <div onClick={() => setPage('notices')} className="bg-slate-800 p-4 rounded-xl text-center cursor-pointer border border-slate-700/50 hover:bg-slate-700">
                <Bell className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <span className="text-xs font-medium">নোটিশ (Notices)</span>
              </div>
              <div onClick={() => setPage('passport')} className="bg-slate-800 p-4 rounded-xl text-center cursor-pointer border border-slate-700/50 hover:bg-slate-700">
                <FileCheck2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-xs font-medium">পাসপোর্ট স্ট্যাটাস</span>
              </div>
              <div onClick={() => setPage('track')} className="bg-slate-800 p-4 rounded-xl text-center cursor-pointer border border-slate-700/50 hover:bg-slate-700">
                <FileText className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <span className="text-xs font-medium">আবেদন ট্র্যাকিং</span>
              </div>
              <div onClick={() => setPage('chat')} className="bg-slate-800 p-4 rounded-xl text-center cursor-pointer border border-slate-700/50 hover:bg-slate-700">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <span className="text-xs font-medium">চ্যাট সাপোর্ট</span>
              </div>
              <div onClick={() => setPage('profile')} className="bg-slate-800 p-4 rounded-xl text-center cursor-pointer border border-slate-700/50 hover:bg-slate-700">
                <User className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <span className="text-xs font-medium">প্রোফাইল</span>
              </div>
            </div>
          </div>
        )}

        {page === 'social' && (
          <div>
            <h2 className="text-lg font-bold mb-3">সোশ্যাল কমিউনিটি</h2>
            {initialPosts.map(p => (
              <div key={p.id} className="bg-slate-800 p-4 rounded-xl mb-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">{p.author_name[0]}</div>
                  <div>
                    <h4 className="text-sm font-bold">{p.author_name}</h4>
                    <span className="text-[10px] text-slate-400">{p.time}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-200 mb-2">{p.content}</p>
              </div>
            ))}
          </div>
        )}

        {page === 'jobs' && (
          <div>
            <h2 className="text-lg font-bold mb-3">চাকরির সুযোগ</h2>
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-slate-800 p-4 rounded-xl mb-3 border-l-4 border-emerald-500 border border-slate-700">
                <h3 className="font-bold text-base text-white">{job.title}</h3>
                <p className="text-xs text-slate-300 mb-1">{job.company} - {job.location}</p>
                <p className="text-xs text-slate-400 mb-2">{job.description}</p>
                <span className="text-xs font-semibold text-emerald-400">বেতন: {job.salary}</span>
              </div>
            ))}
          </div>
        )}

        {page === 'notices' && (
          <div>
            <h2 className="text-lg font-bold mb-3">জরুরি নোটিশ ও ঘোষণা</h2>
            {notices.map((n, idx) => (
              <div key={idx} className="bg-slate-800 p-4 rounded-xl mb-3 border border-slate-700">
                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] font-semibold">{n.tag}</span>
                <h3 className="font-bold text-sm mt-1 text-white">{n.title}</h3>
                <span className="text-[10px] text-slate-400">তারিখ: {n.date}</span>
              </div>
            ))}
          </div>
        )}

        {page === 'passport' && (
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold mb-2">পাসপোর্ট ট্র্যাকিং</h2>
            <p className="text-xs text-slate-300 mb-4">আপনার পাসপোর্ট নম্বর লিখে স্ট্যাটাস চেক করুন।</p>
            <input type="text" placeholder="পাসপোর্ট নম্বর দিন..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white mb-3" />
            <button className="w-full bg-emerald-600 py-2.5 rounded-lg text-sm font-bold">স্ট্যাটাস চেক করুন</button>
          </div>
        )}

        {page === 'track' && (
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold mb-2">আবেদন ট্র্যাকিং</h2>
            <div className="space-y-3 mt-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold">পাসপোর্ট নবায়ন</h4>
                  <span className="text-xs text-slate-400">TRK-2024-001</span>
                </div>
                <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded">প্রক্রিয়াধীন</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold">কোম্পানি পরিবর্তন</h4>
                  <span className="text-xs text-slate-400">TRK-2024-002</span>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">সম্পন্ন</span>
              </div>
            </div>
          </div>
        )}

        {page === 'profile' && <ProfilePage />}
        {page === 'chat' && <ChatPage />}
        
        {page === 'search' && (
          <div>
            <h2 className="text-lg font-bold mb-3">সার্চ ফলাফল: "{searchQuery}"</h2>
            <p className="text-xs text-slate-400">আপনার অনুসন্ধানের সাথে মিলFound ফলাফল নিচে দেখানো হলো।</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around items-center py-2 px-4 shadow-lg z-50">
        {navItems.map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => setPage(item.page)}
            className={`flex flex-col items-center justify-center transition-all ${item.isCenter ? '-mt-5' : ''}`}
          >
            {item.isCenter ? (
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-900 text-white">
                <item.icon size={22} />
              </div>
            ) : (
              <item.icon size={20} className={page === item.page ? 'text-emerald-400' : 'text-slate-400'} />
            )}
            <span className={`text-[10px] mt-1 ${page === item.page ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
