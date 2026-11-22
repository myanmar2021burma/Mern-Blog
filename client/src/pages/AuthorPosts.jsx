import { useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import PostCard from '../components/PostCard';
import { Alert, EmptyState, Loader } from '../components/ui';
import { api } from '../lib/api';
import { useAsync } from '../lib/utils';

export default function AuthorPosts() {
  const { id } = useParams();
  const { data, loading, error } = useAsync(async () => {
    const [author, posts] = await Promise.all([api.users.get(id), api.posts.byUser(id)]);
    return { author, posts };
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Alert>{error}</Alert>;
  const { author, posts } = data;

  return (
    <div>
      <div className="mb-10 flex items-center gap-5 rounded-2xl border border-stone-200 bg-white p-6">
        <Avatar name={author.name} src={author.avatar} size={80} />
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          <p className="mt-1 text-sm text-stone-500">{posts.length} posts</p>
        </div>
      </div>

      {posts.length === 0 && <EmptyState title="ဒီ author ရေးထားတာ မရှိသေးပါ" />}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} author={author} />
        ))}
      </div>
    </div>
  );
}
