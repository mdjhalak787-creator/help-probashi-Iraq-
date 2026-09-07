import { useEffect, useState, FormEvent } from 'react';
import { 
  ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, Building2, Calendar, 
  ChevronRight, CircleHelp, ClipboardList, Clock3, FileCheck2, 
  FileText, Home as HomeIcon, Info, LayoutDashboard, LogOut, MapPin, 
  Menu, MessageCircle, MoreHorizontal, Pencil, Plus, Search, Settings, 
  SlidersHorizontal, Sparkles, ThumbsUp, TrendingUp, User, Users, 
  MessageSquare, UserCheck, UserX, Lock, Eye, EyeOff, AlertCircle 
} from 'lucide-react';
import { supabase } from './lib/supabase';
import './App.css';

type Page = 'home' | 'social' | 'jobs' | 'notices' | 'passport' | 'search';
type Post = { id: string; author_name: string; author_role: string; content: string; time: string; likes_count: number; comments_count: number };
type Application = { id: string; tracking_code: string; title: string; status: string; date: string };
type ChatMessage = { id: string; sender_name: string; sender_role: string; message: string; time: string };
type UserProfile = { id: string; full_name: string; email: string; user_role: string };
type Job = { company: string; title: string; location: string; salary: string; description: string };

const jobs: Job[] = [
  { company: 'Al-Nahrain Transport Co.', title: 'সেফটি ইঞ্জিনিয়ার', location: 'বাগদাদ, ইরাক', salary: '$800 - $1000', description: 'অভিজ্ঞ সেফটি ইঞ্জিনিয়ার প্রয়োজন। থাকা ও খাওয়া ফ্রি।' },
  { company: 'Al-Basra Engineering', title: 'সিভিল সুপারভাইজার', location: 'বসরা, ইরাক', salary: '$900 - $1200', description: 'বিল্ডিং কনস্ট্রাকশনের কাজে অভিজ্ঞ সুপারভাইজার।' },
  { company: 'Iraq Bangla Trading', title: 'সেলস এক্সিকিউটিভ', location: 'এরবিল, ইরাক', salary: '$600 - $750', description: 'বাংলা ও আরবি ভাষায় দক্ষ সেলস কর্মী প্রয়োজন।' },
  { company: 'Al-Safa Construction', title: 'সাইট সুপারভাইজার', location: 'নাজাফ, ইরাক', salary: '$700 - $900', description: 'নির্মাণ প্রকল্পে কাজের তদারকি করার জন্য লোক প্রয়োজন।' },
  { company: 'Baghdad IT Solutions', title: 'ওয়ার্কার / লেবার', location: 'বাগদাদ, ইরাক', salary: '$500 - $600', description: 'সাধারণ লেবার ও প্যাকিংয়ের কাজ।' }
];

const notices = [
  { title: 'পাসপোর্ট নবায়ন সংক্রান্ত গুরুত্বপূর্ণ নোটিশ', date: '০৫ মে, ২০২৬', tag: 'জরুরি' },
  { title: 'ইরাকে নতুন ভিসা নীতিমালা', date: '০৩ মে, ২০২৬', tag: 'নিউজ' },
  { title: 'দূরভাষী সহায়তা চালুর সময়সূচি', date: '৩০ এপ্রিল, ২০২৬', tag: 'ঘোষণা' },
  { title: 'কন্ট্রাক্ট বিষয়ে অনিয়ম - ২০২৬', date: '২৭ এপ্রিল, ২০২৬', tag: 'সতর্কতা' },
  { title: 'কম্পানির লাইসেন্স আপডেট নির্দেশনা', date: '২২ এপ্রিল, ২০২৬', tag: 'অফিসিয়াল' }
];

const initialPosts: Post[] = [
  { id: 'seed-1', author_name: 'রতন আলম', author_role: 'সদস্য', content: 'ইরাকের কুর্দিস্তান অঞ্চলে আবহাওয়া বেশ ভালো। কাজের পরিবেশও চমৎকার। প্রবাসীদের জন্য শুভকামনা।', time: '২ ঘণ্টা আগে', likes_count: 14, comments_count: 3 },
  { id: 'seed-2', author_name: 'কামরুল হাসান', author_role: 'মডারেটর', content: 'যেকোনো আইনি সহায়তার জন্য সরাসরি হেল্পলাইনে যোগাযোগ করুন। প্রবাসী কল্যাণ সবসময় আপনাদের পাশে আছে।', time: '৫ ঘণ্টা আগে', likes_count: 28, comments_count: 7 }
];

const navItems = [
  { page: 'home' as Page, label: 'হোম', icon: HomeIcon },
  { page: 'social' as Page, label: 'সোশ্যাল', icon: Users },
  { page: 'jobs' as Page, label: 'চাকরি', icon: BriefcaseBusiness },
  { page: 'notices' as Page, label: 'নোটিশ', icon: Bell },
  { page: 'profile' as Page, label: 'প্রোফাইল', icon: UserRound = User }
];

const serviceItems = [
  { page: 'notices' as Page, label: 'জরুরি নোটিশ', sub: 'লেটেস্ট আপডেট', icon: Bell, color: 'text-amber-500' },
  { page: 'jobs' as Page, label: 'চাকরি ও নিয়োগ', sub: 'ইরাক জবস', icon: BriefcaseBusiness, color: 'text-blue-500' },
  { page: 'passport' as Page, label: 'পাসপোর্ট স্ট্যাটাস', sub: 'ট্র্যাকিং সেবা', icon: FileCheck2, color: 'text-emerald-500' },
  { page: 'search' as Page, label: 'অনলাইন সার্চ', sub: 'Track Application', icon: Search, color: 'text-purple-500' }
];

function SearchResults({ query }: { query: string }) {
  const lowerQuery = query.toLowerCase();
  const matchedJobs = jobs.filter(j => j.title.toLowerCase().includes(lowerQuery) || j.company.toLowerCase().includes(lowerQuery) || j.location.toLowerCase().includes(lowerQuery));
  const matchedNotices = notices.filter(n => n.title.toLowerCase().includes(n.title.toLowerCase()) || n.tag.toLowerCase().includes(lowerQuery));
  const matchedPosts = initialPosts.filter(p => p.content.toLowerCase().includes(lowerQuery) || p.author_name.toLowerCase().includes(lowerQuery));

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>সার্চ ফলাফল: "{query}"</h2>
      
      <section style={{ marginTop: '20px' }}>
        <h3>চাকরি ({matchedJobs.length})</h3>
        {matchedJobs.length === 0 ? <p style={{ color: '#666' }}>কোনো চাকরি পাওয়া যায়নি।</p> : matchedJobs.map((job, idx) => (
          <div key={idx} style={{ background: '#fff', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd' }}>
            <strong>{job.title}</strong> - {job.company} ({job.location})<br />
            <small>{job.description} | বেতন: {job.salary}</small>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '20px' }}>
        <h3>নোটিশ ({matchedNotices.length})</h3>
        {matchedNotices.length === 0 ? <p style={{ color: '#666' }}>কোনো নোটিশ পাওয়া যায়নি।</p> : matchedNotices.map((n, idx) => (
          <div key={idx} style={{ background: '#fff', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd' }}>
            <strong>{n.title}</strong><br /><small>তারিখ: {n.date} | ট্যাগ: {n.tag}</small>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '20px' }}>
        <h3>পোস্ট ({matchedPosts.length})</h3>
        {matchedPosts.length === 0 ? <p style={{ color: '#666' }}>কোনো পোস্ট পাওয়া যায়নি।</p> : matchedPosts.map((p) => (
          <div key={p.id} style={{ background: '#fff', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd' }}>
            <strong>{p.author_name}</strong> ({p.author_role})<br />
            <p>{p.content}</p>
            <small>{p.time}</small>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      setPage('search');
    }
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', background: '#f5f7fa', paddingBottom: '70px' }}>
      {/* Header */}
      <header style={{ background: '#0d9488', color: '#fff', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', margin: 0 }}>প্রবাসী হেল্প কেয়ার ইরাক</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="সার্চ করুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery) {
                window.history.pushState({}, '', `?q=${encodeURIComponent(searchQuery)}`);
                setPage('search');
              }
            }}
            style={{ padding: '6px 12px', borderRadius: '4px', border: 'none' }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '16px' }}>
        {page === 'home' && (
          <div>
            <h2>স্বাগতম প্রবাসী ভাইদের</h2>
            <p>ইরাকে থাকা বাংলাদেশিদের সকল প্রকার সহায়তা ও তথ্য পেতে নিচের সেবাগুলো ব্যবহার করুন।</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '20px' }}>
              {serviceItems.map((item, idx) => (
                <div key={idx} onClick={() => setPage(item.page)} style={{ background: '#fff', padding: '16px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <item.icon size={28} className={item.color} />
                  <h4 style={{ margin: '8px 0 4px 0' }}>{item.label}</h4>
                  <small style={{ color: '#666' }}>{item.sub}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'social' && (
          <div>
            <h2>সোশ্যাল কমিউনিটি</h2>
            {initialPosts.map(p => (
              <div key={p.id} style={{ background: '#fff', padding: '12px', margin: '10px 0', borderRadius: '8px' }}>
                <strong>{p.author_name}</strong> <small style={{ color: '#888' }}>({p.author_role})</small>
                <p>{p.content}</p>
                <small style={{ color: '#aaa' }}>{p.time}</small>
              </div>
            ))}
          </div>
        )}

        {page === 'jobs' && (
          <div>
            <h2>ইরাকের চাকরির সুযোগ</h2>
            {jobs.map((job, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '14px', margin: '10px 0', borderRadius: '8px', borderLeft: '4px solid #0d9488' }}>
                <h3 style={{ margin: '0 0 6px 0' }}>{job.title}</h3>
                <p style={{ margin: '0 0 6px 0', color: '#444' }}>{job.company} - {job.location}</p>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{job.description}</p>
                <strong>বেতন: {job.salary}</strong>
              </div>
            ))}
          </div>
        )}

        {page === 'notices' && (
          <div>
            <h2>জরুরি নোটিশ ও ঘোষণা</h2>
            {notices.map((n, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '14px', margin: '10px 0', borderRadius: '8px' }}>
                <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{n.tag}</span>
                <h3 style={{ margin: '6px 0' }}>{n.title}</h3>
                <small style={{ color: '#666' }}>তারিখ: {n.date}</small>
              </div>
            ))}
          </div>
        )}

        {page === 'search' && <SearchResults query={searchQuery} />}
      </main>

      {/* Bottom Navigation */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #ddd', padding: '10px 0' }}>
        {navItems.map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => setPage(item.page)}
            style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: page === item.page ? '#0d9488' : '#666' }}
          >
            <item.icon size={22} />
            <span style={{ fontSize: '12px', marginTop: '2px' }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
