import { UPLOADS } from './api';
import { useEffect, useState } from 'react';

// Backend postModel ထဲက enum နဲ့ အတိအကျ တူရမယ်
export const CATEGORIES = [
  'Agriculture',
  'Business',
  'Education',
  'Entertainment',
  'Art',
  'Investment',
  'Uncategorized',
  'Weather',
];

export const imgUrl = (file) => (file ? `${UPLOADS}/${file}` : '');

export const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

export const readTime = (text = '') => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));

export const excerpt = (text = '', n = 130) => (text.length > n ? text.slice(0, n).trimEnd() + '…' : text);

// fetch လုပ်ပြီး loading / error / data ကို ကိုင်ပေးတဲ့ hook
export function useAsync(fn, deps) {
  const [state, setState] = useState({ loading: true, data: null, error: '' });

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: '' }));
    fn()
      .then((data) => alive && setState({ loading: false, data, error: '' }))
      .catch((e) => alive && setState({ loading: false, data: null, error: e.message }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const setData = (data) => setState((s) => ({ ...s, data }));
  return { ...state, setData };
}
