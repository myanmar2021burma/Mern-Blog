import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaTelegramPlane } from 'react-icons/fa';
import { CATEGORIES } from '../lib/utils';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-lg font-bold text-stone-900">Inkwell</p>
          <p className="mt-1 text-sm text-stone-500">ရေးချင်တာ ရေး၊ ဖတ်ချင်တာ ဖတ်။</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
          {CATEGORIES.slice(0, 5).map((c) => (
            <Link key={c} to={`/?category=${c}`} className="hover:text-orange-700">
              {c}
            </Link>
          ))}
        </div>

        <div className="flex gap-3 text-stone-500">
          <a href="#" aria-label="Facebook" className="rounded-full border border-stone-200 p-2.5 hover:text-orange-700"><FaFacebookF /></a>
          <a href="#" aria-label="Telegram" className="rounded-full border border-stone-200 p-2.5 hover:text-orange-700"><FaTelegramPlane /></a>
          <a href="#" aria-label="GitHub" className="rounded-full border border-stone-200 p-2.5 hover:text-orange-700"><FaGithub /></a>
        </div>
      </div>
      <p className="border-t border-stone-100 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Inkwell. All rights reserved.
      </p>
    </footer>
  );
}
