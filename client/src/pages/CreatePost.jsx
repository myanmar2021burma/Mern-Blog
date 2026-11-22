import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { useAuth } from '../store/authStore';
import { api } from '../lib/api';

export default function CreatePost() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const create = async (form) => {
    const post = await api.posts.create(form);
    refreshProfile();
    navigate(`/posts/${post._id}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Write a new post</h1>
      <PostForm submitLabel="Publish" requireThumbnail onSubmit={create} />
    </div>
  );
}
