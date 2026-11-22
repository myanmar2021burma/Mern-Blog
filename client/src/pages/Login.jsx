import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from 'lucide-react';
import { Alert } from '../components/ui';
import { useAuth } from '../store/authStore';
import { api } from '../lib/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.auth.login(form); // { token, id, name }
      login(data);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md pt-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-stone-500">Account ထဲ ဝင်ရန် အချက်အလက် ဖြည့်ပါ။</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {location.state?.registered && <Alert type="success">Register လုပ်ပြီးပါပြီ။ ဝင်ကြည့်ပါ။</Alert>}
          <Alert>{error}</Alert>

          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input className="input !pl-9" type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required />
            </div>
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input className="input !px-9" type={show ? 'text' : 'password'} name="password" value={form.password} onChange={change} placeholder="••••••" required />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />} Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          Account မရှိသေးဘူးလား? <Link to="/register" className="font-medium text-orange-700 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
