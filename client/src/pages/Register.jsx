import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Lock, Mail, User, UserPlus } from 'lucide-react';
import { Alert } from '../components/ui';
import { api } from '../lib/api';

const fields = [
  { name: 'name', label: 'Name', type: 'text', icon: User, placeholder: 'သင့်နာမည်' },
  { name: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
  { name: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: 'အနည်းဆုံး ၆ လုံး' },
  { name: 'password2', label: 'Confirm password', type: 'password', icon: Lock, placeholder: 'ထပ်ရိုက်ပါ' },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password2) return setError('Password နှစ်ခု မတူပါ။');
    setLoading(true);
    try {
      await api.auth.register(form);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md pt-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="mt-1 text-sm text-stone-500">ရေးသူအဖြစ် စတင်ရန် Sign up လုပ်ပါ။</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Alert>{error}</Alert>
          {fields.map(({ name, label, type, icon: Icon, placeholder }) => (
            <div key={name}>
              <label className="label">{label}</label>
              <div className="relative">
                <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input className="input !pl-9" type={type} name={name} value={form[name]} onChange={change} placeholder={placeholder} required />
              </div>
            </div>
          ))}
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />} Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          Account ရှိပြီးသားလား? <Link to="/login" className="font-medium text-orange-700 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
