import { Link } from 'react-router-dom';
import { Briefcase, CloudSun, Clapperboard, GraduationCap, Palette, Sprout, Tag, TrendingUp } from 'lucide-react';

export const CATEGORY_ICONS = {
  Agriculture: Sprout,
  Business: Briefcase,
  Education: GraduationCap,
  Entertainment: Clapperboard,
  Art: Palette,
  Investment: TrendingUp,
  Uncategorized: Tag,
  Weather: CloudSun,
};

export default function CategoryBadge({ category, link = true }) {
  const Icon = CATEGORY_ICONS[category] || Tag;
  const cls =
    'inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700';
  const inner = (
    <>
      <Icon size={12} /> {category}
    </>
  );
  return link ? (
    <Link to={`/?category=${category}`} className={`${cls} hover:bg-orange-100`}>
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
