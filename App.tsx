import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, Building2, CalendarDays, Check,
  ChevronRight, CircleHelp, ClipboardList, Clock3, FileCheck2, FileText, Globe2,
  Home as HomeIcon, Info, LayoutDashboard, LogOut, MapPin,
  Menu, MessageCircle, MoreHorizontal, Pencil, Plus, Search, Send, Settings, Shield,
  SlidersHorizontal, Sparkles, ThumbsUp, TrendingUp, User, UserRound, Users, X,
  type LucideIcon, UserCheck, UserX
} from 'lucide-react';
import { supabase } from './lib/supabase';
import './App.css';

type Page = 'home' | 'social' | 'jobs' | 'notices' | 'passport' | 'track' | 'chat' | 'profile' | 'agent' | 'admin' | 'super' | 'search';
type Post = { id: string; author_name: string; author_role: string; content: string; image_url?: string | null; likes: number; created_at: string };
type Application = { id: string; tracking_code: string; title: string; category: string; status: string; submitted_at: string };
type ChatMessage = { id: string; sender_name: string; sender_role: string; content: string; created_at: string };
type UserProfile = { id: string; full_name: string; email: string; role: 'admin' | 'agent' | 'user'; status: 'pending' | 'approved' | 'rejected'; created_at: string };

type Job = { company: string; title: string; location: string; salary: string; type: string; icon: LucideIcon; color: string; description: string };

const jobs: Job[] = [
  { company: 'Al-Nahrain Transport Co.', title: 'হেভি ড্রাইভার', location: 'বাগদাদ, ইরাক', salary: 'IQD 750,000 - 900,000', type: 'ফুল টাই��[...]'},
  { company: 'Al-Basra Engineering', title: 'সিভিল ইঞ্জিনিয়ার', location: 'বসরা, ইরাক', salary: 'IQD 800,000 - 1,000,000', type: 'ফুল টা�[...]'},
  { company: 'Iraq Bangla Trading', title: 'সেলস এক্সিকিউটিভ', location: 'এরবিল, ইরাক', salary: 'IQD 700,000 - 850,000', type: 'ফুল টাই�[...]'},
  { company: 'Al-Safa Construction', title: 'সাইট সুপারভাইজার', location: 'নাজাফ, ইরাক', salary: 'IQD 900,000 - 1,100,000', type: 'ফুল টা�[...]'},
];

const notices = [
  { title: 'পাসপোর্ট নবায়ন সংক্রান্ত গুরুত্বপূর্ণ নোটিশ', date: '০৬ মে, ২০২৪', tag: 'জরুর��[...]'},
  { title: 'ইরাকে নতুন ভিসা নীতিমালা', date: '০৩ মে, ২০২৪', tag: 'সাধারণ', icon: FileCheck2, color: 'green' },
  { title: 'প্রবাসী কল্যাণের নতুন নির্দেশনা', date: '২৮ এপ্রিল, ২০২৪', tag: 'সরকারি', icon: FileText, co[...]},
  { title: 'ছুটির দিনের তালিকা - ২০২৪', date: '২৪ এপ্রিল, ২০২৪', tag: 'সাধারণ', icon: CalendarDays, color: 'teal' },
  { title: 'কর্মসংস্থান পরিষেবা সম্পর্কে নির্দেশনা', date: '১৮ এপ্রিল, ২০২৪', tag: 'সাধারণ[...]'},
];

const initialPosts: Post[] = [
  { id: 'seed-1', author_name: 'Rashid Alom', author_role: 'সদস্য', content: 'আজ বাগদাদে বৃষ্টি হচ্ছে, সবাই নিরাপদে থা��[...]'},
  { id: 'seed-2', author_name: 'Sujon Ahmed', author_role: 'সদস্য', content: 'নতুন কাজের সুযোগ সম্পর্কে জানতে চাকরি বি[...]'},
];

const navItems: { page: Page; label: string; icon: LucideIcon }[] = [
  { page: 'home', label: 'হোম', icon: HomeIcon }, 
  { page: 'social', label: 'সোশ্যাল', icon: Users },
  { page: 'jobs', label: 'চাকরি', icon: BriefcaseBusiness }, 
  { page: 'notices', label: 'নোটিশ', icon: Bell }, 
  { page: 'profile', label: 'প্রোফাইল', icon: UserRound },
];

const serviceItems: { page: Page; label: string; sub: string; icon: LucideIcon; color: string }[] = [
  { page: 'jobs', label: 'চাকরির সুযোগ', sub: 'Jobs', icon: BriefcaseBusiness, color: 'blue' }, 
  { page: 'notices', label: 'নোটিশ / বিজ্ঞপ্তি', sub: 'Notices', icon: Bell, color: 'purple' },
  { page: 'passport', label: 'পাসপোর্ট স্ট্যাটাস', sub: 'Passport Status', icon: FileCheck2, color: 'red' }, 
  { page: 'track', label: 'আবেদন ট্র্যাকিং', sub: 'Track Application', icon: ClipboardList, color: 'teal' },
  { page: 'chat', label: 'চ্যাট সাপোর্ট', sub: 'Chat Support', icon: MessageCircle, color: 'orange' }, 
  { page: 'profile', label: 'আমার প্রোফাইল', sub: 'My Profile', icon: UserRound, color: 'green' },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState<Page>('home');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { 
    const timer = window.setTimeout(() => setShowSplash(false), 1500); 
    return () => window.clearTimeout(timer); 
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postResult, appResult, chatResult] = await Promise.all([
          supabase.from('social_posts').select('*').order('created_at', { ascending: false }),
          supabase.from('applications').select('*').order('submitted_at', { ascending: false }),
          supabase.from('chat_messages').select('*').order('created_at', { ascending: true }),
        ]);
        if (postResult.data?.length) setPosts(postResult.data as Post[]);
        if (appResult.data) setApplications(appResult.data as Application[]);
        if (chatResult.data?.length) setMessages(chatResult.data as ChatMessage[]);
      } catch (err) {
        console.error('Data loading error:', err);
      }
    };
    void loadData();
  }, []);

  // Read ?q= on initial load and switch to search view
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q')?.trim();
    if (q) {
      setSearch(q);
      setPage('search');
    }
  }, []);

  const notify = (message: string) => { 
    setToast(message); 
    window.setTimeout(() => setToast(''), 2800); 
  };

  const createPost = async (content: string) => {
    const optimistic: Post = { 
      id: `local-${Date.now()}`, 
      author_name: 'Md Zalak Mia', 
      author_role: 'সদস্য', 
      content, 
      likes: 0, 
      created_at: new Date().toISOString() 
    };
    setPosts((current) => [optimistic, ...current]);
    const { data, error } = await supabase
      .from('social_posts')
      .insert({ author_name: optimistic.author_name, author_role: optimistic.author_role, content })
      .select()
      .maybeSingle();

    if (error) { 
      notify('পোস্টটি সাময়িকভাবে স্থানীয়ভাবে রাখা হয়েছে'); 
      return; 
    }
    if (data) {
      setPosts((current) => current.map((post) => post.id === optimistic.id ? data as Post : post));
    }
  };

  const likePost = async (post: Post) => {
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, likes: item.likes + 1 } : item));
    if (!post.id.startsWith('seed-') && !post.id.startsWith('local-')) {
      await supabase.from('social_posts').update({ likes: post.likes + 1 }).eq('id', post.id);
    }
  };

  const applyForJob = async (job: Job) => {
    const trackingCode = `IRQ-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
    const application = { 
      tracking_code: trackingCode, 
      title: job.title, 
      category: 'চাকরির আবেদন', 
      status: 'জমা হয়েছে', 
      submitted_at: new Date().toISOString().slice(0, 10) 
    };
    const { data } = await supabase.from('applications').insert(application).select().maybeSingle();
    if (data) {
      setApplications((current) => [data as Application, ...current]);
    }
    setSelectedJob(null); 
    setPage('track'); 
    notify(`আবেদন সফলভাবে জমা হয়েছে — ${trackingCode}`);
  };

  const sendMessage = async (content: string) => {
    const message = { sender_name: 'Md Zalak Mia', sender_role: 'user', content };
    const { data } = await supabase.from('chat_messages').insert(message).select().maybeSingle();
    
    if (data) {
      setMessages((current) => [...current, data as ChatMessage]);
    } else {
      setMessages((current) => [...current, { ...message, id: `local-${Date.now()}`, created_at: new Date().toISOString() }]);
    }

    window.setTimeout(() => {
      setMessages((current) => [
        ...current, 
        { 
          id: `agent-${Date.now()}`, 
          sender_name: 'রহমান আলী', 
          sender_role: 'agent', 
          content: 'আপনার বার্তা পেয়েছি। একজন অফিসিয়াল এজেন্ট খুব শীঘ্রই সাহায্য করবেন।',
          created_at: new Date().toISOString() 
        }
      ]);
    }, 900);
  };

  if (showSplash) return <Splash />;

  function SearchResults({ query }: { query: string }) {
    const q = query.trim().toLowerCase();

    const postsList = posts || [];
    const appsList = applications || [];

    const postMatches = postsList.filter(p => ((p.content || '') + ' ' + (p.author_name || '')).toLowerCase().includes(q)).slice(0, 10);
    const jobMatches = jobs.filter(j => (j.title + ' ' + j.company + ' ' + j.location).toLowerCase().includes(q)).slice(0, 10);
    const noticeMatches = notices.filter(n => (n.title + ' ' + (n.tag || '')).toLowerCase().includes(q)).slice(0, 10);
    const appMatches = appsList.filter(a => ((a.tracking_code || '') + ' ' + (a.title || '')).toLowerCase().includes(q)).slice(0, 10);

    return (
      <div className="search-page">
        <div className="page-header">
          <h2>Search results for “{query}”</h2>
          <p>Showing matches from posts, jobs, notices, and applications</p>
        </div>

        <div className="results-grid">
          <section>
            <h3>Posts</h3>
            {postMatches.length === 0 && <div className="muted">No posts</div>}
            {postMatches.map(p => (
              <div key={p.id} className="result-item" onClick={() => { setPage('social'); }}>
                <strong>{p.author_name}</strong>
                <p>{(p.content || '').slice(0, 120)}{(p.content || '').length > 120 ? '…' : ''}</p>
                <small>{p.created_at?.slice(0,10)}</small>
              </div>
            ))}
          </section>

          <section>
            <h3>Jobs</h3>
            {jobMatches.length === 0 && <div className="muted">No jobs</div>}
            {jobMatches.map((j, i) => (
              <div key={i} className="result-item" onClick={() => { setSelectedJob(j); setPage('jobs'); }}>
                <strong>{j.title}</strong>
                <p>{j.company} • {j.location}</p>
              </div>
            ))}
          </section>

          <section>
            <h3>Notices</h3>
            {noticeMatches.length === 0 && <div className="muted">No notices</div>}
            {noticeMatches.map((n, i) => (
              <div key={i} className="result-item" onClick={() => setPage('notices')}>
                <strong>{n.title}</strong>
                <small>{n.date} · {n.tag}</small>
              </div>
            ))}
          </section>

          <section>
            <h3>Applications</h3>
            {appMatches.length === 0 && <div className="muted">No applications</div>}
            {appMatches.map(a => (
              <div key={a.id} className="result-item" onClick={() => setPage('track')}>
                <strong>{a.title}</strong>
                <small>কোড: {a.tracking_code}</small>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <button className="icon-button" onClick={() => page === 'home' ? notify('মেনু শীঘ্রই আসছে') : setPage('home')} aria-label="menu">
            <Menu size={20} />
          </button>
          <div className="brand-mini">
            <span className="brand-mark"><Sparkles size={15} /></span>
            <span>ইরাক প্রবাসী হেল্প</span>
          </div>
          <button className="icon-button notification" onClick={() => setPage('notices')} aria-label="notifications">
            <Bell size={19} />
            <i />
          </button>
        </header>

        <main className="screen-content">
          {page === 'home' && <Home setPage={setPage} />}
          {page === 'social' && <Social posts={posts} createPost={createPost} likePost={likePost} notify={notify} />}
          {page === 'jobs' && <Jobs search={search} setSearch={setSearch} openJob={setSelectedJob} />}
          {page === 'notices' && <Notices />}
          {page === 'passport' && <Passport />}
          {page === 'track' && <Track applications={applications} search={search} setSearch={setSearch} />}
          {page === 'chat' && <Chat messages={messages} sendMessage={sendMessage} />}
          {page === 'profile' && <Profile setPage={setPage} notify={notify} />}
          {page === 'agent' && <Dashboard kind="agent" setPage={setPage} />}
          {page === 'admin' && <AdminPanel setPage={setPage} />}
          {page === 'super' && <Dashboard kind="super" setPage={setPage} />}
          {page === 'search' && <SearchResults query={search} />}
        </main>

        <BottomNav page={page} setPage={setPage} />

        {selectedJob && <JobModal job={selectedJob} close={() => setSelectedJob(null)} apply={applyForJob} />}
        {toast && (
          <div className="toast">
            <Check size={16} />
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

function Splash() { 
  return (
    <div className="splash">
      <div className="splash-glow" />
      <div className="splash-logo"><Sparkles size={48} /></div>
      <h1>ইরাক প্রবাসী হেল্প</h1>
      <p>Iraq Probashi Help</p>
      <div className="splash-tag">প্রবাসীর পাশে, সব সময়</div>
      <span className="splash-arabic">مساعدة للمغتربين في العراق</span>
      <div className="splash-flags"><span>●</span><span>العراق</span></div>
    </div>
  ); 
}

function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { 
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && <button onClick={onAction}>{action}<ChevronRight size={15} /></button>}
    </div>
  ); 
}

function Home({ setPage }: { setPage: (page: Page) => void }) { 
  return (
    <>
      <div className="welcome">
        <div>
          <span className="eyebrow">বাগদাদ, ইরাক</span>
          <h1>স্বাগতম, Md Zalak Mia</h1>
          <p>আপনার প্রবাস জীবনকে সহজ করতে আমরা পাশে আছি।</p>
        </div>
        <div className="avatar">ZM</div>
      </div>
      <div className="hero-card">
        <div>
          <span className="hero-kicker">২৪/৭ সহায়তা কেন্দ্র</span>
          <h2>প্রবাসীর সেবা<br />আমাদের অঙ্গীকার</h2>
          <p>সব তথ্য, এক জায়গায়</p>
        </div>
        <Globe2 size={72} strokeWidth={1} />
      </div>
      <SectionTitle title="দ্রুত সেবা" action="সব দেখুন" onAction={() => setPage('track')} />
      <div className="service-grid">
        {serviceItems.map((item) => (
          <button className="service-card" key={item.page} onClick={() => setPage(item.page)}>
            <span className={`service-icon ${item.color}`}><item.icon size={21} /></span>
            <strong>{item.label}</strong>
            <small>{item.sub}</small>
          </button>
        ))}
      </div>
      <div className="status-card" onClick={() => setPage('passport')}>
        <div className="status-icon"><FileCheck2 size={20} /></div>
        <div>
          <span className="eyebrow">সর্বশেষ আপডেট</span>
          <h3>আপনার পাসপোর্ট আবেদন প্রস্তুত</h3>
          <p>ট্র্যাকিং কোড: IRQ-2024-001</p>
        </div>
        <ChevronRight />
      </div>
      <SectionTitle title="আজকের আপডেট" action="সব নোটিশ" onAction={() => setPage('notices')} />
      <div className="mini-notice">
        <Bell size={18} />
        <div>
          <strong>নতুন ভিসা নীতিমালা প্রকাশিত হয়েছে</strong>
          <small>৩ মে, ২০২৪ · সরকারি বিজ্ঞপ্তি</small>
        </div>
        <ChevronRight size={18} />
      </div>
    </>
  ); 
}

function Social({ posts, createPost, likePost, notify }: { posts: Post[]; createPost: (content: string) => Promise<void>; likePost: (post: Post) => Promise<void>; notify: (message: string) => voi[...],