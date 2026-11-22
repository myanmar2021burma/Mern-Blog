import { imgUrl } from '../lib/utils';

// ပုံရှိရင် ပုံပြ၊ မရှိရင် နာမည်ရဲ့ ပထမစာလုံးကို ပြ
export default function Avatar({ name = '?', src, size = 36 }) {
  const style = { width: size, height: size, fontSize: size * 0.42 };
  if (src) {
    return <img src={imgUrl(src)} alt={name} style={style} className="shrink-0 rounded-full object-cover" />;
  }
  return (
    <span
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-orange-100 font-semibold uppercase text-orange-700"
    >
      {name.trim().charAt(0) || '?'}
    </span>
  );
}
