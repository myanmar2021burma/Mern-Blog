import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, SquarePen, Trash2 } from 'lucide-react';
import CategoryBadge from '../components/CategoryBadge';
import { Alert, EmptyState, Loader } from '../components/ui';
import { useAuth } from '../store/authStore';
import { api } from '../lib/api';
import { formatDate, imgUrl, useAsync } from '../lib/utils';

export default function Dashboard() {
  const { user, refreshProfile } = useAuth();
  const { data: posts, loading, error, setData } = useAsync(() => api.posts.byUser(user.id), [user.id]);
  const [actionError, setActionError] = useState('');

  const remove = async (post) => {
    if (!window.confirm(`"${post.title}" ကို ဖျက်မလား?`)) return;
    setActionError('');
    try {
      await api.posts.remove(post._id);
      setData(posts.filter((p) => p._id !== post._id)); // list ကနေ ချက်ချင်းဖယ်
      refreshProfile();
    } catch (e) {
      setActionError(e.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My posts</h1>
          <p className="mt-1 text-sm text-stone-500">{posts ? `${posts.length} posts` : ''}</p>
        </div>
        <Link to="/posts/create" className="btn-primary"><SquarePen size={16} /> New post</Link>
      </div>

      <Alert>{error || actionError}</Alert>
      {loading && <Loader />}

      {posts && posts.length === 0 && (
        <EmptyState
          title="ရေးထားတဲ့ post မရှိသေးပါ"
          text="ပထမဆုံး ဆောင်းပါးလေး စရေးကြည့်ရအောင်။"
          action={<Link to="/posts/create" className="btn-primary">Write now</Link>}
        />
      )}

      <div className="space-y-3">
        {posts?.map((p) => (
          <div key={p._id} className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center">
            <img src={imgUrl(p.thumbnail)} alt="" className="h-28 w-full rounded-xl object-cover sm:h-20 sm:w-32" />
            <div className="min-w-0 flex-1">
              <CategoryBadge category={p.category} link={false} />
              <h3 className="mt-1.5 truncate text-base font-bold">{p.title}</h3>
              <p className="text-xs text-stone-400">{formatDate(p.createdAt)}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/posts/${p._id}`} className="btn-ghost !px-3 !py-2" title="View"><Eye size={16} /></Link>
              <Link to={`/posts/${p._id}/edit`} className="btn-ghost !px-3 !py-2" title="Edit"><Pencil size={16} /></Link>
              <button onClick={() => remove(p)} className="btn-danger !px-3 !py-2" title="Delete"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
