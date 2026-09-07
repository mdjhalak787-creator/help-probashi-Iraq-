import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/admin';
import { Shield, UserCheck, UserX, Clock, Users } from 'lucide-react';

export default function AdminPanel() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRoleAndStatus = async (userId: string, newRole: string, newStatus: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole, status: newStatus })
      .eq('id', userId);

    if (error) {
      alert('আপডেট করতে সমস্যা হয়েছে: ' + error.message);
    } else {
      alert('সফলভাবে আপডেট করা হয়েছে!');
      fetchUsers();
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shield className="w-5 h-5" /> বস অ্যাডমিন ও এজেন্ট কন্ট্রোল প্যানেল
        </h2>
        <p className="text-xs text-emerald-100 mt-1">এখান থেকে পুরো অ্যাপের ইউজার এবং এজেন্টদের ভূমিকা ও অনুমতি নিয়ন্ত্রণ করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">মোট ইউজার</p>
            <h3 className="text-xl font-bold text-gray-800">{users.length}</h3>
          </div>
          <Users className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">অনুমোদিত এজেন্ট</p>
            <h3 className="text-xl font-bold text-gray-800">
              {users.filter(u => u.role === 'agent' && u.status === 'approved').length}
            </h3>
          </div>
          <UserCheck className="w-8 h-8 text-teal-600" />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">পেন্ডিং আবেদন</p>
            <h3 className="text-xl font-bold text-gray-800">
              {users.filter(u => u.status === 'pending').length}
            </h3>
          </div>
          <Clock className="w-8 h-8 text-amber-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 font-bold text-gray-800">সকল ইউজার ও এজেন্ট তালিকা</div>
        <div className="divide-y divide-gray-100">
          {users.map((user) => (
            <div key={user.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-800">{user.full_name || 'নামবিহীন ইউজার'}</h4>
                <p className="text-xs text-gray-500">{user.email}</p>
                <div className="flex gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'agent' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    রোল: {user.role}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    user.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                    user.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    স্ট্যাটাস: {user.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {user.role !== 'agent' ? (
                  <button
                    onClick={() => updateUserRoleAndStatus(user.id, 'agent', 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-xl hover:bg-emerald-700 transition"
                  >
                    এজেন্ট বানান
                  </button>
                ) : (
                  <button
                    onClick={() => updateUserRoleAndStatus(user.id, 'user', 'rejected')}
                    className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-xl hover:bg-red-600 transition flex items-center gap-1"
                  >
                    <UserX className="w-3.5 h-3.5" /> এজেন্ট বাতিল
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
