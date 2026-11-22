import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Pencil, Trash2 } from 'lucide-react';
import Avatar from '../components/Avatar';
import CategoryBadge from '../components/CategoryBadge';
import { Alert, Loader } from '../components/ui';
import { useAuth } from '../store/authStore';
import { api } from '../lib/api';
import { formatDate, imgUrl, readTime, useAsync } from '../lib/utils';

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [actionError, setActionError] = useState('');

  // post ယူပြီးမှ creator id နဲ့ author ကို ဆက်ယူမယ်
  const { data, loading, error } = useAsync(async () => {
    const post = await api.posts.get(id);
    const author = await api.users.get(post.creator).catch(() => null);
    return { post, author };
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Alert>{error}</Alert>;

  const { post, author } = data;
  const isOwner = user?.id === post.creator;

  const handleDelete = async () => {
    if (!window.confirm('ဒီ post ကို တကယ်ဖျက်မလား?')) return;
    try {
      await api.posts.remove(post._id);
      navigate('/dashboard');
    } catch (e) {
      setActionError(e.message);
    }
  };

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900">
        <ArrowLeft size={16} /> Back
      </Link>

      <CategoryBadge category={post.category} />
      <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Link to={author ? `/authors/${author._id}` : '#'} className="flex items-center gap-3">
          <Avatar name={author?.name} src={author?.avatar} size={44} />
          <div>
            <p className="text-sm font-semibold">{author?.name || 'Unknown'}</p>
            <p className="flex items-center gap-1 text-xs text-stone-500">
              {formatDate(post.createdAt)} · <Clock size={12} /> {readTime(post.description)} min read
            </p>
          </div>
        </Link>

        {isOwner && (
          <div className="flex gap-2">
            <Link to={`/posts/${post._id}/edit`} className="btn-ghost !py-2"><Pencil size={15} /> Edit</Link>
            <button onClick={handleDelete} className="btn-danger !py-2"><Trash2 size={15} /> Delete</button>
          </div>
        )}
      </div>

      <div className="mt-4"><Alert>{actionError}</Alert></div>

      <img src={imgUrl(post.thumbnail)} alt={post.title} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />

      <div className="mt-8 whitespace-pre-line text-[17px] leading-8 text-stone-700">{post.description}</div>
    </article>
  );
}
