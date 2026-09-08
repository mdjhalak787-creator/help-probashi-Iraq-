import { useState } from 'react';
import {
  Bell,
  BriefcaseBusiness,
  FileCheck2,
  Home as HomeIcon,
  Search,
  Users,
  User,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Settings,
  LogOut,
  FileText,
  Send,
  Smile,
  Globe,
  Shield,
  UserCheck,
  Heart,
  MessageCircle,
  CheckCircle2,
  Clock3,
  Headphones,
  Menu,
  X
} from 'lucide-react';

import './App.css';

import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';

type Page =
  | 'home'
  | 'social'
  | 'jobs'
  | 'notices'
  | 'passport'
  | 'search'
  | 'profile'
  | 'track'
  | 'chat'
  | 'agent-dash'
  | 'admin-dash'
  | 'super-dash';

type Post = {
  id: string;
  author_name: string;
  author_role: string;
  content: string;
  time: string;
  likes_count: number;
  comments_count: number;
};

type Job = {
  company: string;
  title: string;
  location: string;
  salary: string;
  description: string;
};

const jobs: Job[] = [
  {
    company: 'Al-Nahrain Transport Co.',
    title: 'ড্রাইভার (Driver)',
    location: 'বাগদাদ, ইরাক',
    salary: 'IQD 750,000 - 900,000',
    description: 'হেভি ভেহিকেলে অভিজ্ঞ ড্রাইভার প্রয়োজন।'
  },
  {
    company: 'Al-Basra Engineering',
    title: 'সেলস এক্সিকিউটিভ',
    location: 'বসরা, ইরাক',
    salary: 'IQD 800,000 - 1,000,000',
    description: 'ইন্ডাস্ট্রিয়াল সেলস ও মার্কেটিংয়ে অভিজ্ঞ।'
  },
  {
    company: 'Iraq Bangla Trading',
    title: 'সেলস এক্সিকিউটিভ',
    location: 'এরবিল, ইরাক',
    salary: 'IQD 700,000 - 850,000',
    description: 'জেনারেল ট্রেডিংয়ের জন্য কর্মী আবশ্যক।'
  },
  {
    company: 'Al-Safa Construction',
    title: 'সহায়ক (Helper)',
    location: 'নাজাফ, ইরাক',
    salary: 'IQD 550,000 - 650,000',
    description: 'নির্মাণ প্রকল্পে সাধারণ কাজ।'
  }
];

const notices = [
  {
    title: 'পাসপোর্ট নবায়ন সংক্রান্ত গুরুত্বপূর্ণ নোটিশ',
    date: '০৫ মে, ২০২৬',
    tag: 'গুরুত্বপূর্ণ'
  },
  {
    title: 'ইরাকে নতুন ভিসা নীতিমালা',
    date: '৩০ এপ্রিল, ২০২৬',
    tag: 'জরুরি'
  },
  {
    title: 'শ্রম মন্ত্রণালয়ের নির্দেশনা',
    date: '২৮ এপ্রিল, ২০২৬',
    tag: 'সরকারি'
  },
  {
    title: 'ছুটির দিনের তালিকা - ২০২৬',
    date: '২৫ এপ্রিল, ২০২৬',
    tag: 'সাধারণ'
  }
];

const initialPosts: Post[] = [
  {
    id: 'seed-1',
    author_name: 'Rashid Alom',
    author_role: 'সদস্য',
    content: 'আজ ইরাকে বৃষ্টি, আলহামদুলিল্লাহ 🌧️ সবাই কেমন আছেন?',
    time: '22m',
    likes_count: 128,
    comments_count: 14
  },
  {
    id: 'seed-2',
    author_name: 'Sujon Ahmed',
    author_role: 'মডারেটর',
    content: 'নতুন কাজ শুরু করলাম, দোয়া করবেন 🙏',
    time: '1h',
    likes_count: 45,
    comments_count: 5
  }
];

const navItems = [
  { page: 'home' as Page, label: 'হোম', icon: HomeIcon },
  { page: 'social' as Page, label: 'কমিউনিটি', icon: Users },
  { page: 'jobs' as Page, label: 'সেবা', icon: BriefcaseBusiness, isCenter: true },
  { page: 'chat' as Page, label: 'চ্যাট', icon: MessageCircle },
  { page: 'profile' as Page, label: 'প্রোফাইল', icon: User }
];

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="splash" onClick={onFinish}>
      <div className="splash-glow" />

      <div className="splash-logo">
        <Users size={72} strokeWidth={1.6} />
      </div>

      <h1>ইরাক প্রবাসী হেল্প</h1>

      <p>Iraq Probashi Help</p>

      <div className="splash-tag">
        প্রবাসীর পাশে, সব সময়
      </div>

      <div className="splash-arabic">
        مساعدة للمغتربين في العراق
      </div>

      <div className="splash-flags">
        <span>🇧🇩 বাংলাদেশ</span>
        <span>🇮🇶 ইরাক</span>
      </div>

      <p>ট্যাপ করে ভেতরে প্রবেশ করুন</p>
    </div>
  );
}

function ProfilePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="profile-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>

        <h2>আমার প্রোফাইল</h2>
        <p>আপনার ব্যক্তিগত তথ্য ও সেটিংস</p>
      </div>

      <div className="profile-card">
        <div className="avatar large">মু</div>

        <h2>মুসফাক রাশেদ</h2>

        <p>Baghdad, Iraq</p>

        <p style={{ marginTop: 6 }}>
          +964 770 123 4567
        </p>

        <p style={{ marginTop: 4 }}>
          rashed.bd1995@gmail.com
        </p>
      </div>

      <div className="profile-menu">
        <button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={19} />
            ব্যক্তিগত তথ্য
          </span>
          <ChevronRight size={18} />
        </button>

        <button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={19} />
            আমার আবেদন সমূহ
          </span>
          <ChevronRight size={18} />
        </button>

        <button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bell size={19} />
            নোটিফিকেশন সেটিংস
          </span>
          <ChevronRight size={18} />
        </button>

        <button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Globe size={19} />
            ভাষা / Language
          </span>
          <span>বাংলা</span>
        </button>

        <button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Settings size={19} />
            সেটিংস
          </span>
          <ChevronRight size={18} />
        </button>

        <button className="logout">
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LogOut size={19} />
            লগ আউট
          </span>
        </button>
      </div>
    </div>
  );
}

function ChatPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="chat-container">
      <div className="page-header">
        <h2>চ্যাট সাপোর্ট</h2>
        <p>প্রবাসী হেল্প সাপোর্ট টিম</p>
      </div>

      <div className="message-list">
        <div className="message-bubble agent">
          <small>সাপোর্ট টিম</small>
          <p>
            আসসালামু আলাইকুম, কীভাবে সাহায্য করতে পারি?
          </p>
        </div>

        <div className="message-bubble user">
          <small>আপনি</small>
          <p>
            আমি পাসপোর্ট নবায়ন করতে চাই।
          </p>
        </div>

        <div className="message-bubble agent">
          <small>সাপোর্ট টিম</small>
          <p>
            জী, আপনার পাসপোর্ট, আইডি কার্ড এবং ছবি লাগবে।
          </p>
        </div>
      </div>

      <div className="chat-input-box">
        <Smile size={21} />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="মেসেজ লিখুন..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setMessage('');
            }
          }}
        />

        <button onClick={() => setMessage('')}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div>
      <div className="welcome">
        <div>
          <span className="eyebrow">স্বাগতম</span>
          <h1>মুসফাক রাশেদ</h1>
          <p>Baghdad, Iraq</p>
        </div>

        <div className="avatar">মু</div>
      </div>

      <div className="hero-card">
        <div>
          <span className="hero-kicker">
            প্রবাসী হেল্প • ইরাক
          </span>

          <h2>
            প্রবাসীর পাশে,
            <br />
            সব সময়
          </h2>

          <p>
            আপনার প্রয়োজনীয় সেবা এক জায়গায়।
          </p>
        </div>

        <Headphones size={56} strokeWidth={1.4} />
      </div>

      <div className="section-title">
        <h2>দ্রুত সেবা</h2>
        <button onClick={() => setPage('jobs')}>
          সব দেখুন
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="service-grid">
        <div
          className="service-card"
          onClick={() => setPage('jobs')}
        >
          <div className="service-icon blue">
            <BriefcaseBusiness size={20} />
          </div>
          <strong>চাকরি</strong>
          <small>নতুন সুযোগ</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('notices')}
        >
          <div className="service-icon orange">
            <Bell size={20} />
          </div>
          <strong>নোটিশ</strong>
          <small>গুরুত্বপূর্ণ</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('passport')}
        >
          <div className="service-icon green">
            <FileCheck2 size={20} />
          </div>
          <strong>পাসপোর্ট</strong>
          <small>স্ট্যাটাস</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('track')}
        >
          <div className="service-icon purple">
            <FileText size={20} />
          </div>
          <strong>আবেদন ট্র্যাক</strong>
          <small>অবস্থা দেখুন</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('chat')}
        >
          <div className="service-icon teal">
            <Headphones size={20} />
          </div>
          <strong>সাপোর্ট</strong>
          <small>সহায়তা নিন</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('social')}
        >
          <div className="service-icon red">
            <Users size={20} />
          </div>
          <strong>কমিউনিটি</strong>
          <small>সবার সাথে</small>
        </div>
      </div>

      <div
        className="status-card"
        onClick={() => setPage('track')}
      >
        <div className="status-icon">
          <Clock3 size={20} />
        </div>

        <div>
          <h3>আপনার আবেদন প্রক্রিয়াধীন</h3>
          <p>পাসপোর্ট নবায়ন • TRK-2024-001</p>
        </div>

        <ChevronRight size={18} />
      </div>

      <div
        className="mini-notice"
        onClick={() => setPage('notices')}
      >
        <Bell size={19} />

        <div>
          <strong>নতুন গুরুত্বপূর্ণ নোটিশ</strong>
          <small>
            পাসপোর্ট নবায়ন সংক্রান্ত তথ্য
          </small>
        </div>

        <ChevronRight size={18} />
      </div>

      <div className="section-title">
        <h2>ড্যাশবোর্ড</h2>
      </div>

      <div className="service-grid">
        <div
          className="service-card"
          onClick={() => setPage('agent-dash')}
        >
          <div className="service-icon blue">
            <Users size={20} />
          </div>
          <strong>এজেন্ট</strong>
          <small>ড্যাশবোর্ড</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('admin-dash')}
        >
          <div className="service-icon green">
            <UserCheck size={20} />
          </div>
          <strong>অ্যাডমিন</strong>
          <small>প্যানেল</small>
        </div>

        <div
          className="service-card"
          onClick={() => setPage('super-dash')}
        >
          <div className="service-icon orange">
            <Shield size={20} />
          </div>
          <strong>সুপার অ্যাডমিন</strong>
          <small>মাস্টার</small>
        </div>
      </div>
    </div>
  );
}

function SocialPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [text, setText] = useState('');

  const addPost = () => {
    if (!text.trim()) return;

    setPosts([
      {
        id: Date.now().toString(),
        author_name: 'মুসফাক রাশেদ',
        author_role: 'সদস্য',
        content: text,
        time: 'এখন',
        likes_count: 0,
        comments_count: 0
      },
      ...posts
    ]);

    setText('');
  };

  return (
    <div>
      <div className="page-header">
        <h2>সোশ্যাল কমিউনিটি</h2>
        <p>ইরাকে থাকা প্রবাসীদের সাথে যুক্ত থাকুন</p>
      </div>

      <div className="composer">
        <div className="avatar small">মু</div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="আপনার কথা লিখুন..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') addPost();
          }}
        />

        <button onClick={addPost}>
          <Send size={15} />
        </button>
      </div>

      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-head">
            <div className="avatar small">
              {post.author_name[0]}
            </div>

            <div>
              <strong>{post.author_name}</strong>
              <small>
                {post.author_role} • {post.time}
              </small>
            </div>
          </div>

          <p>{post.content}</p>

          <div className="post-stats">
            <span>
              <Heart size={12} className="reaction-dot" />{' '}
              {post.likes_count}
            </span>

            <span>
              {post.comments_count} মন্তব্য
            </span>
          </div>

          <div className="post-actions">
            <button>
              <Heart size={15} />
              লাইক
            </button>

            <button>
              <MessageCircle size={15} />
              মন্তব্য
            </button>

            <button>
              <Send size={15} />
              শেয়ার
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div>
      <div className="page-header">
        <h2>চাকরির সুযোগ</h2>
        <p>ইরাকে প্রবাসীদের জন্য নতুন চাকরির খবর</p>
      </div>

      <div className="search-box">
        <Search size={17} />

        <input
          placeholder="চাকরি বা কোম্পানি খুঁজুন..."
        />
      </div>

      <div className="job-list">
        {jobs.map((job, index) => (
          <button
            className="job-card"
            key={index}
            onClick={() => setSelectedJob(job)}
          >
            <div className="job-icon blue">
              <BriefcaseBusiness size={20} />
            </div>

            <div className="job-info">
              <strong>{job.title}</strong>
              <small>{job.company}</small>

              <small>
                <MapPin size={12} />
                {job.location}
              </small>

              <b>{job.salary}</b>
            </div>

            <ChevronRight size={17} />
          </button>
        ))}
      </div>

      {selectedJob && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              <X size={17} />
            </button>

            <div className="job-icon large blue">
              <BriefcaseBusiness size={26} />
            </div>

            <h3>{selectedJob.title}</h3>

            <div className="company-name">
              {selectedJob.company}
            </div>

            <div className="location">
              <MapPin size={15} />
              {selectedJob.location}
            </div>

            <div className="salary-tag">
              {selectedJob.salary}
            </div>

            <p className="desc">
              {selectedJob.description}
            </p>

            <button
              className="apply-btn"
              onClick={() => setSelectedJob(null)}
            >
              আবেদন করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NoticesPage() {
  return (
    <div>
      <div className="page-header">
        <h2>জরুরি নোটিশ ও ঘোষণা</h2>
        <p>গুরুত্বপূর্ণ তথ্য ও সর্বশেষ আপডেট</p>
      </div>

      <div className="notice-list">
        {notices.map((notice, index) => (
          <div className="notice-item" key={index}>
            <div
              className={`notice-badge ${
                index === 1 ? 'red' : 'orange'
              }`}
            >
              <Bell size={19} />
            </div>

            <div>
              <strong>{notice.title}</strong>
              <small>
                {notice.date} • {notice.tag}
              </small>
            </div>

            <ChevronRight size={17} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PassportPage() {
  const [passport, setPassport] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div className="page-header">
        <h2>পাসপোর্ট ট্র্যাকিং</h2>
        <p>
          আপনার পাসপোর্টের আবেদন স্ট্যাটাস দেখুন
        </p>
      </div>

      <div className="status-box">
        <h3>পাসপোর্ট নম্বর</h3>

        <div className="track-search">
          <FileCheck2 size={17} />

          <input
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            placeholder="পাসপোর্ট নম্বর দিন..."
          />
        </div>

        <button
          className="apply-btn"
          style={{ marginTop: 0 }}
          onClick={() => setChecked(true)}
        >
          স্ট্যাটাস চেক করুন
        </button>

        {checked && (
          <div className="status-box">
            <CheckCircle2
              size={25}
              style={{ color: 'var(--green)' }}
            />

            <p className="status-text">
              ডেমো স্ট্যাটাস: আবেদন প্রক্রিয়াধীন।
            </p>

            <small>
              এটি শুধুমাত্র DEMO তথ্য।
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

function TrackPage() {
  return (
    <div>
      <div className="page-header">
        <h2>আবেদন ট্র্যাকিং</h2>
        <p>আপনার সকল আবেদনের বর্তমান অবস্থা</p>
      </div>

      <div className="app-list">
        <div className="app-item">
          <div>
            <strong>পাসপোর্ট নবায়ন</strong>
            <small>TRK-2024-001</small>
          </div>

          <span className="badge">
            প্রক্রিয়াধীন
          </span>
        </div>

        <div className="app-item">
          <div>
            <strong>কোম্পানি পরিবর্তন</strong>
            <small>TRK-2024-002</small>
          </div>

          <span className="badge">
            সম্পন্ন
          </span>
        </div>
      </div>
    </div>
  );
}

function SearchPage({
  searchQuery,
  setPage
}: {
  searchQuery: string;
  setPage: (page: Page) => void;
}) {
  return (
    <div>
      <div className="page-header">
        <button
          className="back-button"
          onClick={() => setPage('home')}
        >
          <ArrowLeft size={20} />
        </button>

        <h2>সার্চ ফলাফল</h2>

        <p>
          "{searchQuery}" এর জন্য ফলাফল
        </p>
      </div>

      <div className="status-box">
        <Search size={25} />

        <p className="status-text">
          আপনার অনুসন্ধানের সাথে মিল পাওয়া
          ডেমো ফলাফল এখানে দেখানো হবে।
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  return (
    <div className="app-shell">
      <div className="app-frame">

        <header className="topbar">
          <div className="brand-mini">
            <div className="brand-mark">
              <Users size={16} />
            </div>

            <span>প্রবাসী হেল্প কেয়ার</span>
          </div>

          <button
            className="icon-button notification"
            onClick={() => setPage('notices')}
          >
            <Bell size={19} />
            <i />
          </button>
        </header>

        <main className="screen-content">

          {page === 'home' && (
            <HomePage setPage={setPage} />
          )}

          {page === 'social' && (
            <SocialPage />
          )}

          {page === 'jobs' && (
            <JobsPage />
          )}

          {page === 'notices' && (
            <NoticesPage />
          )}

          {page === 'passport' && (
            <PassportPage />
          )}

          {page === 'track' && (
            <TrackPage />
          )}

          {page === 'chat' && (
            <ChatPage />
          )}

          {page === 'profile' && (
            <ProfilePage
              onBack={() => setPage('home')}
            />
          )}

          {page === 'agent-dash' && (
            <AgentDashboard />
          )}

          {page === 'admin-dash' && (
            <AdminDashboard />
          )}

          {page === 'super-dash' && (
            <SuperAdminDashboard />
          )}

          {page === 'search' && (
            <SearchPage
              searchQuery={searchQuery}
              setPage={setPage}
            />
          )}

        </main>

        <div
          style={{
            position: 'absolute',
            top: 76,
            right: 18,
            left: 18,
            zIndex: 3
          }}
        >
          <div className="search-box">
            <Search size={16} />

            <input
              type="text"
              placeholder="সার্চ করুন..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  searchQuery.trim()
                ) {
                  setPage('search');
                }
              }}
            />
          </div>
        </div>

        <nav className="bottom-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.page}
                className={
                  page === item.page ? 'active' : ''
                }
                onClick={() => setPage(item.page)}
              >
                {item.isCenter ? (
                  <div className="service-icon green">
                    <Icon size={22} />
                  </div>
                ) : (
                  <Icon size={20} />
                )}

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
