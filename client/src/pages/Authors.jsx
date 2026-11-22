import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { Alert, EmptyState, Loader } from '../components/ui';
import { api } from '../lib/api';
import { useAsync } from '../lib/utils';

export default function Authors() {
  const { data: authors, loading, error } = useAsync(() => api.users.list(), []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Authors</h1>
      <p className="mb-8 mt-1 text-sm text-stone-500">ဒီ blog မှာ ရေးနေတဲ့ ရေးသူများ</p>

      {loading && <Loader />}
      <Alert>{error}</Alert>
      {authors?.length === 0 && <EmptyState title="Author မရှိသေးပါ" />}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {authors?.map((a) => (
          <Link
            key={a._id}
            to={`/authors/${a._id}`}
            className="flex flex-col items-center rounded-2xl border border-stone-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Avatar name={a.name} src={a.avatar} size={72} />
            <h3 className="mt-4 text-base font-bold">{a.name}</h3>
            <p className="mt-1 text-sm text-stone-500">{a.posts || 0} posts</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
