import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { Alert, Loader } from '../components/ui';
import { useAuth } from '../store/authStore';
import { api } from '../lib/api';
import { useAsync } from '../lib/utils';

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: post, loading, error } = useAsync(() => api.posts.get(id), [id]);

  if (loading) return <Loader />;
  if (error) return <Alert>{error}</Alert>;
  if (post.creator !== user.id) return <Alert>ကိုယ်ရေးထားတဲ့ post ကိုပဲ ပြင်လို့ရပါတယ်။</Alert>;

  const save = async (form) => {
    await api.posts.update(id, form);
    navigate(`/posts/${id}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Edit post</h1>
      <PostForm initial={post} submitLabel="Save changes" onSubmit={save} />
    </div>
  );
}
