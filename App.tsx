import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, Building2, CalendarDays, Check,
  ChevronRight, CircleHelp, ClipboardList, Clock3, FileCheck2, FileText, Globe2,
  Home as HomeIcon, Info, LayoutDashboard, LogOut, MapPin,
  Menu, MessageCircle, MoreHorizontal, Pencil, Plus, Search, Send, Settings, Shield,
  SlidersHorizontal, Sparkles, ThumbsUp, TrendingUp, User, UserRound, Users, X,
  type LucideIcon, UserCheck, UserX
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import './App.css';

type Page = 'home' | 'social' | 'jobs' | 'notices' | 'passport' | 'track' | 'chat' | 'profile' | 'agent' | 'admin' | 'super';
type Post = { id: string; author_name: string; author_role: string; content: string; image_url?: string | null; likes: number; created_at: string };
type Application = { id: string; tracking_code: string; title: string; category: string; status: string; submitted_at: string };
type ChatMessage = { id: string; sender_name: string; sender_role: string; content: string; created_at: string };
type UserProfile = { id: string; full_name: string; email: string; role: 'admin' | 'agent' | 'user'; status: 'pending' | 'approved' | 'rejected'; created_at: string };

type Job = { company: string; title: string; location: string; salary: string; type: string; icon: LucideIcon; color: string; description: string };

const jobs: Job[] = [
  { company: 'Al-Nahrain Transport Co.', title: 'হেভি ড্রাইভার', location: 'বাগদাদ, ইরাক', salary: 'IQD 750,000 - 900,000', type: 'ফুল টাইম', icon: Building2, color: 'blue', description: 'সুনামধন্য ট্রান্সপোর্ট কোম্পানিতে অভিজ্ঞ হেভি ড্রাইভার প্রয়োজন। বৈধ ইরাকি ড্রাইভিং লাইসেন্স থাকলে অগ্রাধিকার।' },
  { company: 'Al-Basra Engineering', title: 'সিভিল ইঞ্জিনিয়ার', location: 'বসরা, ইরাক', salary: 'IQD 800,000 - 1,000,000', type: 'ফুল টাইম', icon: BriefcaseBusiness, color: 'cyan', description: 'নির্মাণ প্রকল্পে ৩+ বছরের অভিজ্ঞতা সম্পন্ন সিভিল ইঞ্জিনিয়ার খোঁজা হচ্ছে।' },
  { company: 'Iraq Bangla Trading', title: 'সেলস এক্সিকিউটিভ', location: 'এরবিল, ইরাক', salary: 'IQD 700,000 - 850,000', type: 'ফুল টাইম', icon: TrendingUp, color: 'green', description: 'বাংলা ও আরবি ভাষায় দক্ষ প্রার্থীকে আমাদের টিমে স্বাগতম।' },
  { company: 'Al-Safa Construction', title: 'সাইট সুপারভাইজার', location: 'নাজাফ, ইরাক', salary: 'IQD 900,000 - 1,100,000', type: 'ফুল টাইম', icon: SlidersHorizontal, color: 'orange', description: 'সাইট পরিচালনা ও কর্মী সমন্বয়ের জন্য দক্ষ সুপারভাইজার প্রয়োজন।' },
];

const notices = [
  { title: 'পাসপোর্ট নবায়ন সংক্রান্ত গুরুত্বপূর্ণ নোটিশ', date: '০৬ মে, ২০২৪', tag: 'জরুরি', icon: Bell, color: 'red' },
  { title: 'ইরাকে নতুন ভিসা নীতিমালা', date: '০৩ মে, ২০২৪', tag: 'সাধারণ', icon: FileCheck2, color: 'green' },
  { title: 'প্রবাসী কল্যাণের নতুন নির্দেশনা', date: '২৮ এপ্রিল, ২০২৪', tag: 'সরকারি', icon: FileText, color: 'blue' },
  { title: 'ছুটির দিনের তালিকা - ২০২৪', date: '২৪ এপ্রিল, ২০২৪', tag: 'সাধারণ', icon: CalendarDays, color: 'teal' },
  { title: 'কর্মসংস্থান পরিষেবা সম্পর্কে নির্দেশনা', date: '১৮ এপ্রিল, ২০২৪', tag: 'সাধারণ', icon: ClipboardList, color: 'blue' },
];

const initialPosts: Post[] = [
  { id: 'seed-1', author_name: 'Rashid Alom', author_role: 'সদস্য', content: 'আজ বাগদাদে বৃষ্টি হচ্ছে, সবাই নিরাপদে থাকবেন। নতুন যারা এসেছেন তাদের কোনো সাহায্য লাগলে জানাবেন।', image_url: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1000', likes: 128, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'seed-2', author_name: 'Sujon Ahmed', author_role: 'সদস্য', content: 'নতুন কাজের সুযোগ সম্পর্কে জানতে চাকরি বিভাগটি দেখে নিন। সবার জন্য শুভকামনা।', likes: 42, created_at: new Date(Date.now() - 86400000).toISOString() },
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

function Social({ posts, createPost, likePost, notify }: { posts: Post[]; createPost: (content: string) => Promise<void>; likePost: (post: Post) => Promise<void>; notify: (message: string) => void }) { 
  const [content, setContent] = useState(''); 
  const [commentId, setCommentId] = useState<string | null>(null); 

  const submit = async (event: FormEvent) => { 
    event.preventDefault(); 
    if (!content.trim()) return; 
    await createPost(content.trim()); 
    setContent(''); 
    notify('আপনার পোস্ট প্রকাশিত হয়েছে'); 
  }; 

  return (
    <>
      <div className="page-header">
        <h2>সোশ্যাল ফিড</h2>
        <p>কমিউনিটির সাথে যুক্ত থাকুন</p>
      </div>
      <form className="composer" onSubmit={submit}>
        <div className="avatar small">ZM</div>
        <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="আপনি কী ভাবছেন?" />
        <button type="submit"><Send size={17} /></button>
      </form>
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <div className="post-head">
            <div className="avatar small">{post.author_name.slice(0, 1)}</div>
            <div>
              <strong>{post.author_name}</strong>
              <small>{post.author_role} · {post.created_at.slice(0, 10)}</small>
            </div>
            <MoreHorizontal size={19} />
          </div>
          <p>{post.content}</p>
          {post.image_url && <img className="post-image" src={post.image_url} alt="কমিউনিটি পোস্ট" />}
          <div className="post-stats">
            <span><span className="reaction-dot">♥</span> {post.likes}</span>
          </div>
          <div className="post-actions">
            <button onClick={() => void likePost(post)}><ThumbsUp size={17} /> লাইক</button>
            <button onClick={() => setCommentId(commentId === post.id ? null : post.id)}><MessageCircle size={17} /> কমেন্ট</button>
            <button onClick={() => notify('পোস্টের লিংক কপি হয়েছে')}><ArrowRight size={17} /> শেয়ার</button>
          </div>
        </article>
      ))}
    </>
  ); 
}

function Jobs({ search, setSearch, openJob }: { search: string; setSearch: (s: string) => void; openJob: (j: Job) => void }) {
  const filtered = jobs.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.location.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <div className="page-header">
        <h2>চাকরির সুযোগ</h2>
        <p>ইরাকে আপনার পছন্দের কাজ খুঁজুন</p>
      </div>
      <div className="search-box">
        <Search size={18} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="পদ বা স্থান দিয়ে খুঁজুন..." />
      </div>
      <div className="job-list">
        {filtered.map((job, idx) => (
          <div className="job-card" key={idx} onClick={() => openJob(job)}>
            <div className={`job-icon ${job.color}`}><job.icon size={22} /></div>
            <div className="job-info">
              <h3>{job.title}</h3>
              <p>{job.company} • {job.location}</p>
              <span className="salary">{job.salary}</span>
            </div>
            <ChevronRight size={18} />
          </div>
        ))}
      </div>
    </>
  );
}

function JobModal({ job, close, apply }: { job: Job; close: () => void; apply: (j: Job) => void }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="close-btn" onClick={close}><X size={20} /></button>
        <h3>{job.title}</h3>
        <p className="company-name">{job.company}</p>
        <p className="location"><MapPin size={14} /> {job.location}</p>
        <p className="salary-tag">{job.salary}</p>
        <p className="desc">{job.description}</p>
        <button className="apply-btn" onClick={() => apply(job)}>আবেদন করুন</button>
      </div>
    </div>
  );
}

function Notices() {
  return (
    <>
      <div className="page-header">
        <h2>নোটিশ বোর্ড</h2>
        <p>গুরুত্বপূর্ণ সরকারি ও সাধারণ বিজ্ঞপ্তি</p>
      </div>
      <div className="notice-list">
        {notices.map((n, idx) => (
          <div className="notice-item" key={idx}>
            <span className={`notice-badge ${n.color}`}><n.icon size={18} /></span>
            <div>
              <strong>{n.title}</strong>
              <small>{n.date} · {n.tag}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Passport() {
  return (
    <div className="page-header">
      <h2>পাসপোর্ট স্ট্যাটাস</h2>
      <p>আপনার পাসপোর্টের বর্তমান অবস্থা জানুন</p>
      <div className="status-box">
        <h3>ট্র্যাকিং কোড: IRQ-2024-001</h3>
        <p className="status-text">স্ট্যাটাস: <strong>প্রস্তুত আছে</strong></p>
        <small>ইরাক বাংলাদেশ দূতাবাস থেকে সংগ্রহ করতে পারেন।</small>
      </div>
    </div>
  );
}

function Track({ applications, search, setSearch }: { applications: Application[]; search: string; setSearch: (s: string) => void }) {
  const filtered = applications.filter((a) => a.tracking_code.toLowerCase().includes(search.toLowerCase()) || a.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <div className="page-header">
        <h2>আবেদন ট্র্যাকিং</h2>
        <p>আপনার জমাকৃত আবেদনগুলোর বর্তমান অবস্থা</p>
      </div>
      <div className="search-box">
        <Search size={18} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ট্র্যাকিং কোড দিয়ে খুঁজুন..." />
      </div>
      <div className="app-list">
        {filtered.map((app) => (
          <div className="app-item" key={app.id}>
            <div>
              <strong>{app.title}</strong>
              <small>কোড: {app.tracking_code} • তারিখ: {app.submitted_at}</small>
            </div>
            <span className="badge">{app.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Chat({ messages, sendMessage }: { messages: ChatMessage[]; sendMessage: (c: string) => Promise<void> }) {
  const [text, setText] = useState('');
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage(text.trim());
    setText('');
  };
  return (
    <div className="chat-container">
      <div className="page-header">
        <h2>চ্যাট সাপোর্ট</h2>
        <p>অফিসিয়াল এজেন্টের সাথে কথা বলুন</p>
      </div>
      <div className="message-list">
        {messages.map((m) => (
          <div className={`message-bubble ${m.sender_role === 'user' ? 'user' : 'agent'}`} key={m.id}>
            <small>{m.sender_name}</small>
            <p>{m.content}</p>
          </div>
        ))}
      </div>
      <form className="chat-input-box" onSubmit={submit}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="আপনার বার্তা লিখুন..." />
        <button type="submit"><Send size={16} /></button>
      </form>
    </div>
  );
}

function Profile({ setPage, notify }: { setPage: (p: Page) => void; notify: (m: string) => void }) {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar large">ZM</div>
        <h2>Md Zalak Mia</h2>
        <p>বাগদাদ, ইরাক</p>
      </div>
      <div className="profile-menu">
        <button onClick={() => setPage('track')}><ClipboardList size={18} /> আমার আবেদনসমূহ <ChevronRight size={16} /></button>
        <button onClick={() => setPage('agent')}><Shield size={18} /> এজেন্ট ড্যাশবোর্ড <ChevronRight size={16} /></button>
        <button onClick={() => setPage('admin')}><LayoutDashboard size={18} /> এডমিন প্যানেল <ChevronRight size={16} /></button>
        <button onClick={() => notify('লগ আউট সফল হয়েছে')} className="logout"><LogOut size={18} /> লগ আউট</button>
      </div>
    </div>
  );
}

function Dashboard({ kind, setPage }: { kind: 'agent' | 'admin' | 'super'; setPage: (p: Page) => void }) {
  return (
    <div className="dashboard-page">
      <button className="back-btn" onClick={() => setPage('profile')}><ArrowLeft size={16} /> ফিরে যান</button>
      <h2>{kind === 'agent' ? 'এজেন্ট ড্যাশবোর্ড' : kind === 'admin' ? 'এডমিন প্যানেল' : 'সুপার এডমিন'}</h2>
      <p>ব্যবস্থাপনা ও নিয়ন্ত্রণ প্যানেল</p>
    </div>
  );
}

function AdminPanel({ setPage }: { setPage: (p: Page) => void }) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data) {
      setUsers(data as UserProfile[]);
    } else {
      // ডেমো ডাটা যদি ডাটাবেজ টেবিল না থাকে
      setUsers([
        { id: '1', full_name: 'রফিকুল ইসলাম', email: 'rafiq@gmail.com', role: 'user', status: 'pending', created_at: '2026-03-01' },
        { id: '2', full_name: 'কামাল হোসেন', email: 'kamal@gmail.com', role: 'agent', status: 'approved', created_at: '2026-02-15' }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const updateUserRoleAndStatus = async (userId: string, newRole: 'admin' | 'agent' | 'user', newStatus: 'pending' | 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole, status: newStatus })
      .eq('id', userId);

    if (error) {
      alert('লোকাল মোডে আপডেট করা হয়েছে (ডাটাবেজ কানেকশন চেক করুন)');
    } else {
      alert('সফলভাবে আপডেট করা হয়েছে!');
    }
    setUsers(current => current.map(u => u.id === userId ? { ...u, role: newRole, status: newStatus } : u));
  };

  return (
    <div className="space-y-6 p-4">
      <button className="back-btn mb-4 flex items-center gap-1 text-sm font-semibold text-emerald-600" onClick={() => setPage('profile')}>
        <ArrowLeft size={16} /> প্রোফাইলে ফিরে যান
      </button>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shield className="w-5 h-5" /> বস অ্যাডমিন ও এজেন্ট কন্ট্রোল প্যানেল
        </h2>
        <p className="text-xs text-emerald-100 mt-1">এখান থেকে পুরো অ্যাপের ইউজার এবং এজেন্টদের ভূমিকা ও অনুমতি নিয়ন্ত্রণ করুন।</p>
      </div>

      <div className="grid grid-cols-3 gap-3 my-4">
        <div className="bg-white p-3 rounded-xl shadow border border-gray-100 text-center">
          <p className="text-[11px] text-gray-400">মোট ইউজার</p>
          <h3 className="text-lg font-bold text-gray-800">{users.length}</h3>
        </div>
        <div className="bg-white p-3 rounded-xl shadow border border-gray-100 text-center">
          <p className="text-[11px] text-gray-400">এজেন্ট</p>
          <h3 className="text-lg font-bold text-gray-800">{users.filter(u => u.role === 'agent' && u.status === 'approved').length}</h3>
        </div>
        <div className="bg-white p-3 rounded-xl shadow border border-gray-100 text-center">
          <p className="text-[11px] text-gray-400">পেন্ডিং</p>
          <h3 className="text-lg font-bold text-gray-800">{users.filter(u => u.status === 'pending').length}</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="p-3.5 border-b border-gray-100 font-bold text-sm text-gray-800">সকল ইউজার ও এজেন্ট তালিকা</div>
        {loading ? (
          <div className="p-6 text-center text-xs text-gray-500">লোড হচ্ছে...</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {users.map((user) => (
              <div key={user.id} className="p-3.5 flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-xs text-gray-800">{user.full_name || 'নামবিহীন ইউজার'}</h4>
                  <p className="text-[10px] text-gray-500">{user.email}</p>
                  <div className="flex gap-1.5 mt-1">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'agent' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                      user.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      user.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {user.role !== 'agent' ? (
                    <button
                      onClick={() => void updateUserRoleAndStatus(user.id, 'agent', 'approved')}
                      className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] rounded-lg hover:bg-emerald-700 transition"
                    >
                      এজেন্ট বানান
                    </button>
                  ) : (
                    <button
                      onClick={() => void updateUserRoleAndStatus(user.id, 'user', 'rejected')}
                      className="px-2.5 py-1 bg-red-500 text-white text-[10px] rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                    >
                      <UserX size={12} /> বাতিল
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BottomNav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button key={item.page} className={page === item.page ? 'active' : ''} onClick={() => setPage(item.page)}>
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
