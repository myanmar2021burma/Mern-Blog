import { useMemo } from 'react';
import { api } from './api';
import { useAsync } from './utils';

// Post မှာ creator id ပဲပါတာမို့ authors အားလုံးကို တစ်ခါယူပြီး id နဲ့ ရှာလို့ရအောင် map လုပ်ထားမယ်
export function useAuthorMap() {
  const { data } = useAsync(() => api.users.list(), []);
  return useMemo(() => Object.fromEntries((data || []).map((a) => [a._id, a])), [data]);
}
