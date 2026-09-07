import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, BriefcaseBusiness, Building2, CalendarDays, Check,
  ChevronRight, CircleHelp, ClipboardList, Clock3, FileCheck2, FileText, Globe2,
  Home as HomeIcon, Info, LayoutDashboard, LogOut, MapPin,
  Menu, MessageCircle, MoreHorizontal, Pencil, Plus, Search, Send, Settings, Shield,
  SlidersHorizontal, Sparkles, ThumbsUp, TrendingUp, User, UserRound, Users, X,
  type LucideIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import './App.css';

type Page = 'home' | 'social' | 'jobs' | 'notices' | 'passport' | 'track' | 'chat' | 'profile' | 'agent' | 'admin' | 'super';
type Post = { id: string; author_name: string; author_role: string; content: string; image_url?: string | null; likes: number; created_at: string };
type Application = { id: string; tracking_code: string; title: string; category: string; status: string; submitted_at: string };
type ChatMessage = { id: string; sender_name: string; sender_role: string; content: string; created_at: string };

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
  { id: 'seed-1', author_name: 'Rashid Alom', author_role: 'সদস্য', content: 'আজ বাগদাদে বৃষ্টি হচ্ছে, সবাই নিরাপদে থাকবেন। নতুন যারা এসেছেন তাদের কোনো সাহায্য লাগলে জানাবেন।', image_url: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&tinysrgb&w=1000', likes: 128, created_at: new Date(Date.now() - 3600000).toISOString() },
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
      author_name: 'মুস্তাফা বাংলাদেশ', 
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
    const message = { sender_name: 'মুস্তাফা বাংলাদেশ', sender_role: 'user', content };
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
          {page === 'admin' && <Dashboard kind="admin" setPage={setPage} />}
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
          <h1>স্বাগতম, মুস্তাফা</h1>
          <p>আপনার প্রবাস জীবনকে সহজ করতে আমরা পাশে আছি।</p>
        </div>
        <div className="avatar">মু</div>
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
  const [comment, setComment] = useState(''); 

  const submit = async (event: FormEvent) => { 
    event.preventDefault(); 
    if (!content.trim()) return; 
    await createPost(content.trim()); 
    setContent(''); 
    notify('আপনার পোস্ট প্রকাশিত হয়েছে'); 
  }; 

  return (
    <>
      <PageHeader title="সোশ্যাল" subtitle="কমিউনিটির সাথে যুক্ত থাকুন" />
      <div className="story-row">
        <div className="story-add">
          <span><Plus size={18} /></span>
          <small>আপনার স্টোরি</small>
        </div>
        {['Hasan', 'Rashid', 'Alamin', 'Sujon'].map((name, index) => (
          <div className="story" key={name}>
            <div className={`story-avatar story-${index}`}>{name.slice(0, 1)}</div>
            <small>{name}</small>
          </div>
        ))}
      </div>
      <form className="composer" onSubmit={submit}>
        <div className="avatar small">মু</div>
        <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="আপনি কী ভাবছেন?" />
        <button type="submit"><Send size={17} /></button>
      </form>
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <div className="post-head">
            <div className="avatar small">{post.author_name.slice(0, 1)}</div>
            <div>
              <strong>{post.author_name}</strong>
              <small>{post.author_role} · {timeAgo(post.created_at)}</small>
            </div>
            <MoreHorizontal size={19} />
          </div>
          <p>{post.content}</p>
          {post.image_url && <img className="post-image" src={post.image_url} alt="কমিউনিটি পোস্ট" />}
          <div className="post-stats">
            <span><span className="reaction-dot">♥</span> {post.likes}</span>
            <span>২টি মন্তব্য</span>
          </div>
          <div className="post-actions">
            <button onClick={() => void likePost(post)}><ThumbsUp size={17} /> লাইক</button>
            <button onClick={() => setCommentId(commentId === post.id ? null : post.id)}><MessageCircle size={17} /> কমেন্ট</button>
            <button onClick={() => notify('পোস্টের লিংক কপি হয়েছে')}><ArrowRight size={17} /> শেয়ার</button>
          </div>
          {commentId === post.id && (
            <form className="comment-form" onSubmit={(event) => { event.preventDefault(); setComment(''); notify('মন্তব্য যোগ হয়েছে'); }}>
              <input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="মন্তব্য লিখুন..." />
              <button type="submit"><Send size={16} /></button>
            </form>
          )}
        </article>
      ))}
    </>
  ); 
}

function PageHeader({ title, subtitle, back = false }: { title: string; subtitle?: string; back?: boolean }) { 
  return (
    <div className="page-header">
      {back && <button className="back-button"><ArrowLeft size={20} /></button>}
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <button className="icon-button header-action"><Search size={19} /></button>
    </div>
  ); 
}

function Jobs({ search, setSearch, openJob }: { search: string; setSearch: (value: string) => void; openJob: (job: Job) => void }) { 
  const filtered = jobs.filter((job) => `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(search.toLowerCase())); 
  return (
    <>
      <PageHeader title="চাকরির সুযোগ" subtitle="ইরাকে নতুন সুযোগ খুঁজুন" />
      <div className="search-box">
        <Search size={18} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="চাকরি, কোম্পানি বা শহর খুঁজুন" />
        <SlidersHorizontal size={18} />
      </div>
      <div className="filter-row">
        <button className="active">সব</button>
        <button>জনপ্রিয়</button>
        <button>নতুন</button>
        <button>বেতন বেশি</button>
      </div>
      <div className="job-list">
        {filtered.map((job) => (
          <button className="job-card" key={job.title} onClick={() => openJob(job)}>
            <span className={`job-icon ${job.color}`}><job.icon size={23} /></span>
            <span className="job-info">
              <strong>{job.title}</strong>
              <small>{job.company}</small>
              <small><MapPin size={12} /> {job.location}</small>
              <b>{job.salary}</b>
            </span>
            <span className="job-side"><BookmarkIcon /><small>{job.type}</small></span>
          </button>
        ))}
      </div>
    </>
  ); 
}

function BookmarkIcon() { return <FileCheck2 size={18} />; }

function JobModal({ job, close, apply }: { job: Job; close: () => void; apply: (job: Job) => Promise<void> }) { 
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-sheet" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={close}><X size={20} /></button>
        <span className={`job-icon ${job.color} large`}><job.icon size={28} /></span>
        <span className="eyebrow">{job.company}</span>
        <h2>{job.title}</h2>
        <div className="detail-meta">
          <span><MapPin size={14} />{job.location}</span>
          <span><Clock3 size={14} />{job.type}</span>
        </div>
        <div className="salary-highlight">{job.salary}<small>মাসিক বেতন</small></div>
        <p>{job.description}</p>
        <button className="primary-button" onClick={() => void apply(job)}>এখনই আবেদন করুন <ArrowRight size={17} /></button>
      </div>
    </div>
  ); 
}

function Notices() { 
  const [filter, setFilter] = useState('সব'); 
  const shown = filter === 'সব' ? notices : notices.filter((item) => item.tag === filter); 
  return (
    <>
      <PageHeader title="নোটিশ / বিজ্ঞপ্তি" subtitle="গুরুত্বপূর্ণ তথ্য ও আপডেট" />
      <div className="filter-row notice-filters">
        {['সব', 'জরুরি', 'সরকারি', 'সাধারণ'].map((item) => (
          <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="notice-list">
        {shown.map((notice) => (
          <button className="notice-card" key={notice.title}>
            <span className={`notice-icon ${notice.color}`}><notice.icon size={21} /></span>
            <span>
              <strong>{notice.title}</strong>
              <small>{notice.date} · <em>{notice.tag}</em></small>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </>
  ); 
}

function Passport() { 
  const steps = ['আবেদন জমা', 'ডকুমেন্ট যাচাই', 'প্রসেসিং', 'প্রস্তুত']; 
  return (
    <>
      <PageHeader title="পাসপোর্ট স্ট্যাটাস" subtitle="আপনার পাসপোর্টের অগ্রগতি" back />
      <div className="passport-card">
        <div className="passport-top">
          <div>
            <span className="eyebrow">পাসপোর্ট নম্বর</span>
            <h2>A12345678</h2>
            <p>মুস্তাফা বাংলাদেশ</p>
          </div>
          <FileCheck2 size={22} />
        </div>
        <div className="passport-meta">
          <span><small>জন্ম তারিখ</small><b>12 Jan 1993</b></span>
          <span><small>মেয়াদ শেষ</small><b>11 Jan 2028</b></span>
        </div>
      </div>
      <div className="progress-card">
        <div className="section-title">
          <h2>বর্তমান অবস্থা</h2>
          <span className="pill success">প্রসেসিং</span>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step}>
              <span className={index < 3 ? 'done' : ''}>{index < 3 ? <Check size={14} /> : index + 1}</span>
              <small>{step}</small>
            </div>
          ))}
        </div>
        <div className="timeline">
          <p><strong>ডকুমেন্ট যাচাই সম্পন্ন</strong><span>২৪ এপ্রিল, ২০২৪</span></p>
          <p><strong>প্রসেসিং শুরু হয়েছে</strong><span>২৬ এপ্রিল, ২০২৪</span></p>
        </div>
        <div className="info-note"><Info size={17} /> আপনার পাসপোর্ট প্রস্তুত হলে আপনাকে এসএমএসের মাধ্যমে জানানো হবে।</div>
      </div>
      <button className="primary-button">বিস্তারিত দেখুন <ArrowRight size={17} /></button>
    </>
  ); 
}

function Track({ applications, search, setSearch }: { applications: Application[]; search: string; setSearch: (value: string) => void }) { 
  const records = applications.length ? applications : [{ id: 'demo', tracking_code: 'IRQ-2024-001', title: 'পাসপোর্ট নবায়ন', category: 'পাসপোর্ট', status: 'প্রসেসিং', submitted_at: '2024-04-20' }]; 
  const filtered = records.filter((item) => `${item.tracking_code} ${item.title}`.toLowerCase().includes(search.toLowerCase())); 
  return (
    <>
      <PageHeader title="আবেদন ট্র্যাকিং" subtitle="আপনার সব আবেদনের অবস্থা" back />
      <div className="track-search">
        <Search size={18} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ট্র্যাকিং কোড লিখুন" />
        <button>খুঁজুন</button>
      </div>
      <div className="track-list">
        {filtered.map((item) => (
          <div className="track-card" key={item.id}>
            <div className="track-icon"><FileText size={20} /></div>
            <div>
              <strong>{item.title}</strong>
              <small>{item.tracking_code}</small>
              <small>তারিখ: {item.submitted_at}</small>
            </div>
            <span className={`pill ${item.status === 'জমা হয়েছে' ? 'orange' : 'success'}`}>{item.status}</span>
          </div>
        ))}
      </div>
      <button className="outline-button"><Plus size={18} /> নতুন আবেদন শুরু করুন</button>
    </>
  ); 
}

function Chat({ messages, sendMessage }: { messages: ChatMessage[]; sendMessage: (content: string) => Promise<void> }) { 
  const [input, setInput] = useState(''); 
  const submit = async (event: FormEvent) => { 
    event.preventDefault(); 
    if (!input.trim()) return; 
    await sendMessage(input.trim()); 
    setInput(''); 
  }; 
  return (
    <>
      <PageHeader title="চ্যাট সাপোর্ট" subtitle="অফিসিয়াল এজেন্টের সাথে কথা বলুন" back />
      <div className="agent-bar">
        <div className="agent-avatar">রআ</div>
        <div>
          <strong>রহমান আলী</strong>
          <small><i className="online-dot" /> এখন অনলাইনে · সাধারণত ৫ মিনিটে উত্তর দেন</small>
        </div>
        <PhoneIcon />
      </div>
      <div className="chat-window">
        <div className="date-divider">আজ, ০৬ মে</div>
        {messages.length === 0 && (
          <div className="empty-chat">
            <MessageCircle size={28} />
            <p>আপনার প্রশ্ন লিখে শুরু করুন।</p>
          </div>
        )}
        {messages.map((message) => (
          <div className={`bubble-row ${message.sender_role === 'user' ? 'mine' : ''}`} key={message.id}>
            <div className="bubble">
              <p>{message.content}</p>
              <small>{new Date(message.created_at).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</small>
            </div>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={submit}>
        <button type="button"><Plus size={19} /></button>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="মেসেজ লিখুন..." />
        <button className="send-button" type="submit"><Send size={18} /></button>
      </form>
    </>
  ); 
}

function PhoneIcon() { return <CircleHelp size={21} />; }

function Profile({ setPage, notify }: { setPage: (page: Page) => void; notify: (message: string) => void }) { 
  const [editing, setEditing] = useState(false); 
  return (
    <>
      <PageHeader title="আমার প্রোফাইল" subtitle="আপনার ব্যক্তিগত তথ্য" />
      <div className="profile-head">
        <div className="profile-avatar">মু<span className="camera"><Pencil size={13} /></span></div>
        <h2>মুস্তাফা বাংলাদেশ</h2>
        <p><MapPin size={14} /> বাগদাদ, ইরাক</p>
        <button className="outline-button compact" onClick={() => setEditing(!editing)}><Pencil size={15} /> {editing ? 'সম্পন্ন' : 'প্রোফাইল এডিট'}</button>
      </div>
      {editing && (
        <div className="edit-form">
          <input defaultValue="মুস্তাফা বাংলাদেশ" aria-label="নাম" />
          <input defaultValue="+964 770 123 4567" aria-label="ফোন" />
          <button className="primary-button" onClick={() => { setEditing(false); notify('প্রোফাইল আপডেট হয়েছে'); }}>তথ্য সংরক্ষণ</button>
        </div>
      )}
      <div className="profile-menu">
        {[
          ['ব্যক্তিগত তথ্য', User], 
          ['আমার আবেদনসমূহ', ClipboardList], 
          ['নোটিফিকেশন সেটিংস', Bell], 
          ['ভাষা / Language', Globe2], 
          ['সেটিংস', Settings]
        ].map(([label, Icon]) => (
          <button key={label as string} onClick={() => notify(`${label as string} বিভাগটি খোলা হয়েছে`)}>
            <Icon size={19} />
            <span>{label as string}</span>
            <ChevronRight size={17} />
          </button>
        ))}
        <button className="logout" onClick={() => notify('আপনি নিরাপде লগআউট করেছেন')}>
          <LogOut size={19} />
          <span>লগ আউট</span>
          <ChevronRight size={17} />
        </button>
      </div>
      <SectionTitle title="রোল প্রিভিউ" />
      <div className="role-grid">
        <button onClick={() => setPage('agent')}><Users size={19} />এজেন্ট</button>
        <button onClick={() => setPage('admin')}><Shield size={19} />অ্যাডমিন</button>
        <button onClick={() => setPage('super')}><Settings size={19} />সুপার অ্যাডমিন</button>
      </div>
    </>
  ); 
}

function Dashboard({ kind, setPage }: { kind: 'agent' | 'admin' | 'super'; setPage: (page: Page) => void }) { 
  const config = { 
    agent: { title: 'এজেন্ট ড্যাশবোর্ড', subtitle: 'আপনার ক্লায়েন্ট ও কাজের সারাংশ', name: 'মুস্তাফা বাংলাদেশ', stats: [['মোট ক্লায়েন্ট', '128'], ['চলমান আবেদন', '43'], ['সম্পন্ন', '85']], menus: ['নতুন আবেদন', 'ক্লায়েন্ট সমূহ', 'আবেদন ব্যবস্থাপনা', 'নোটিশ প্রকাশ'] }, 
    admin: { title: 'অ্যাডমিন ড্যাশবোর্ড', subtitle: 'সিস্টেমের সামগ্রিক চিত্র', name: 'সিস্টেম অ্যাডমিন', stats: [['মোট ব্যবহারকারী', '12,548'], ['সক্রিয় এজেন্ট', '523'], ['মোট আবেদন', '8,965'], ['আজকের আবেদন', '2,145']], menus: ['ব্যবহারকারী ব্যবস্থাপনা', 'এজেন্ট ব্যবস্থাপনা', 'আবেদন ব্যবস্থাপনা', 'নোটিশ প্রকাশ'] }, 
    super: { title: 'সুপার-অ্যাডমিন ড্যাশবোর্ড', subtitle: 'সিস্টেম সেটিংস ও নিয়ন্ত্রণ', name: 'সুপার অ্যাডমিন', stats: [['মোট ব্যবহারকারী', '25,689'], ['মোট এজেন্ট', '1,245'], ['মোট আবেদন', '18,745'], ['সক্রিয় সেশন', '9,832']], menus: ['সুপার অ্যাডমিন', 'রোল ম্যানেজমেন্ট', 'সিস্টেম সেটিংস', 'রিপোর্টস'] } 
  }[kind]; 

  return (
    <>
      <PageHeader title={config.title} subtitle={config.subtitle} back />
      <div className="dashboard-hero">
        <div className="profile-avatar mini">{kind === 'agent' ? 'মু' : kind === 'admin' ? 'অ্যা' : 'সু'}</div>
        <div>
          <strong>{config.name}</strong>
          <small>অ্যাক্সেস লেভেল: {kind === 'agent' ? 'AGT-2045' : kind === 'admin' ? 'ADM-001' : 'ROOT-001'}</small>
        </div>
        <Settings size={18} />
      </div>
      <div className={`stats-grid ${config.stats.length === 3 ? 'three' : ''}`}>
        {config.stats.map(([label, value]) => (
          <div className="stat-card" key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
            <TrendingUp size={15} />
          </div>
        ))}
      </div>
      <SectionTitle title="দ্রুত ব্যবস্থাপনা" />
      <div className="manage-grid">
        {config.menus.map((menu, index) => (
          <button key={menu} onClick={() => setPage(index === 3 ? 'notices' : 'profile')}>
            <span className={`manage-icon tone-${index}`}><LayoutDashboard size={18} /></span>
            <span>{menu}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
      <div className="dashboard-note">
        <Sparkles size={18} />
        <div>
          <strong>সব সিস্টেম স্বাভাবিক</strong>
          <small>সর্বশেষ আপডেট: আজ, ০৯:৪১</small>
        </div>
      </div>
    </>
  ); 
}

function BottomNav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) { 
  return (
    <nav className="bottom-nav">
      {navItems.map(({ page: itemPage, label, icon: Icon }) => (
        <button key={itemPage} className={page === itemPage ? 'active' : ''} onClick={() => setPage(itemPage)}>
          <Icon size={19} />
          <span>{label}</span>
        </button>
      ))}
      <button className={['agent', 'admin', 'super'].includes(page) ? 'active' : ''} onClick={() => setPage('profile')}>
        <Menu size={19} />
        <span>মেনু</span>
      </button>
    </nav>
  ); 
}

function timeAgo(value: string) { 
  const minutes = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 60000)); 
  return minutes < 60 ? `${minutes}মি` : `${Math.floor(minutes / 60)}ঘ`; 
}
