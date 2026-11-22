import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import PostCard from '../components/PostCard';
import { CATEGORY_ICONS } from '../components/CategoryBadge';
import { Alert, EmptyState, Loader } from '../components/ui';
import { api } from '../lib/api';
import { CATEGORIES, useAsync } from '../lib/utils';
import { useAuthorMap } from '../lib/hooks';

export default function Home() {
  const [params] = useSearchParams();
  const category = params.get('category') || '';
  const [query, setQuery] = useState('');
  const authors = useAuthorMap();

  // category ရှိရင် /posts/categories/:category၊ မရှိရင် /posts အားလုံး
  const { data: posts, loading, error } = useAsync(
    () => (category ? api.posts.byCategory(category) : api.posts.list()),
    [category]
  );

  const q = query.trim().toLowerCase();
  const visible = (posts || []).filter(
    (p) => !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );

  return (
    <div>
      <section className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          စိတ်ဝင်စားစရာ <span className="text-orange-600">ဆောင်းပါးများ</span>
        </h1>
        <p className="mt-3 text-stone-600">လူတွေရဲ့ အတွေ့အကြုံ၊ အတွေးအမြင်တွေကို ဖတ်ပါ။ ကိုယ့်ဘာသာလည်း ရေးပြီး မျှဝေနိုင်ပါတယ်။</p>
      </section>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <Link
            to="/"
            className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              !category ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white hover:bg-stone-100'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c];
            return (
              <Link
                key={c}
                to={`/?category=${c}`}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  category === c ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white hover:bg-stone-100'
                }`}
              >
                <Icon size={14} /> {c}
              </Link>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input className="input !pl-9" placeholder="Search posts…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {loading && <Loader />}
      <Alert>{error}</Alert>

      {!loading && !error && visible.length === 0 && (
        <EmptyState
          title="Post မရှိသေးပါ"
          text={q ? 'ရှာတဲ့စာလုံးနဲ့ ကိုက်တဲ့ post မတွေ့ပါ။' : 'ဒီ category မှာ ဘာမှ မရေးရသေးပါဘူး။'}
          action={!q && <Link to="/posts/create" className="btn-primary">ပထမဆုံး post ရေးမယ်</Link>}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <PostCard key={p._id} post={p} author={authors[p.creator]} />
        ))}
      </div>
    </div>
  );
}
