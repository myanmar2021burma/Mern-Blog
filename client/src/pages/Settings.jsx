import { useEffect, useState } from 'react';
import { Camera, Loader2, Save } from 'lucide-react';
import Avatar from '../components/Avatar';
import { Alert } from '../components/ui';
import { useAuth } from '../store/authStore';
import { api, STORAGE_KEY } from '../lib/api';

export default function Settings() {
  const { user, profile, login, refreshProfile } = useAuth();

  // ---------- Avatar ----------
  const [avatarMsg, setAvatarMsg] = useState({ type: '', text: '' });
  const [uploading, setUploading] = useState(false);

  const changeAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) return setAvatarMsg({ type: 'error', text: 'ပုံကြီးလွန်းတယ် (500KB အောက်)။' });
    setUploading(true);
    setAvatarMsg({ type: '', text: '' });
    try {
      await api.users.changeAvatar(file);
      await refreshProfile();
      setAvatarMsg({ type: 'success', text: 'Profile ပုံ ပြောင်းပြီးပါပြီ။' });
    } catch (err) {
      setAvatarMsg({ type: 'error', text: err.message });
    }
    setUploading(false);
  };

  // ---------- Account details ----------
  const [form, setForm] = useState({
    name: profile?.name || user.name,
    email: profile?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [saving, setSaving] = useState(false);

  // profile က နောက်မှ load ဖြစ်တာမို့ ရောက်လာရင် name/email ကို ဖြည့်ပေးမယ်
  useEffect(() => {
    if (profile) setForm((f) => ({ ...f, name: profile.name, email: profile.email }));
  }, [profile]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setSaving(true);
    try {
      const updated = await api.users.edit(form);
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      login({ ...stored, name: updated.name });
      setForm({ ...form, currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setMsg({ type: 'success', text: 'သိမ်းပြီးပါပြီ။' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold">Profile picture</h2>
        <div className="mt-4 flex items-center gap-5">
          <Avatar name={user.name} src={profile?.avatar} size={80} />
          <label className="btn-ghost cursor-pointer">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />} Change photo
            <input type="file" accept="image/*" className="hidden" onChange={changeAvatar} />
          </label>
        </div>
        <div className="mt-4"><Alert type={avatarMsg.type || 'error'}>{avatarMsg.text}</Alert></div>
      </section>

      <form onSubmit={save} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold">Account details</h2>
        <p className="text-sm text-stone-500">Backend က password အသစ်ကိုပါ တစ်ခါတည်း တောင်းတာမို့ အကွက်အားလုံး ဖြည့်ရပါမယ်။</p>
        <Alert type={msg.type || 'error'}>{msg.text}</Alert>

        <div>
          <label className="label">Name</label>
          <input className="input" name="name" value={form.name} onChange={change} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" name="email" value={form.email} onChange={change} required />
        </div>
        <div>
          <label className="label">Current password</label>
          <input className="input" type="password" name="currentPassword" value={form.currentPassword} onChange={change} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">New password</label>
            <input className="input" type="password" name="newPassword" value={form.newPassword} onChange={change} required />
          </div>
          <div>
            <label className="label">Confirm new password</label>
            <input className="input" type="password" name="confirmNewPassword" value={form.confirmNewPassword} onChange={change} required />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn-primary" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
