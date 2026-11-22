import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Avatar from './Avatar';
import CategoryBadge from './CategoryBadge';
import { excerpt, formatDate, imgUrl, readTime } from '../lib/utils';

// author = { _id, name, avatar } (မသိရင် undefined ဖြစ်နိုင်တယ်)
export default function PostCard({ post, author }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/posts/${post._id}`} className="block aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={imgUrl(post.thumbnail)}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <CategoryBadge category={post.category} />
        <Link to={`/posts/${post._id}`}>
          <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug group-hover:text-orange-700">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{excerpt(post.description)}</p>

        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
          <Link to={author ? `/authors/${author._id}` : '#'} className="flex min-w-0 items-center gap-2">
            <Avatar name={author?.name} src={author?.avatar} size={28} />
            <span className="truncate text-sm font-medium text-stone-700">{author?.name || 'Unknown'}</span>
          </Link>
          <span className="flex shrink-0 items-center gap-1 text-xs text-stone-400">
            <Clock size={12} /> {readTime(post.description)} min · {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
