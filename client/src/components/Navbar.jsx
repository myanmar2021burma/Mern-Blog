import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, PenLine, Settings, SquarePen, X } from 'lucide-react';
import { useAuth } from '../store/authStore';
import Avatar from './Avatar';

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'text-orange-700' : 'text-stone-600 hover:text-stone-900'
  }`;

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [dropOpen, setDropOpen] = useState(false); // avatar dropdown

  const close = () => {
    setMenuOpen(false);
    setDropOpen(false);
  };

  const handleLogout = () => {
    close();
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={close} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white">
            <PenLine size={18} />
          </span>
          <span className="font-serif text-xl font-bold text-stone-900">Inkwell</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/authors" className={linkClass}>
            Authors
          </NavLink>

          {user ? (
            <>
              <Link to="/posts/create" className="btn-primary ml-2 !py-2">
                <SquarePen size={16} /> Write
              </Link>
              <div className="relative ml-2">
                <button
                  onClick={() => setDropOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-stone-200/60"
                >
                  <Avatar name={user.name} src={profile?.avatar} size={32} />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                {dropOpen && (
                  <>
                    <div className="fixed inset-0" onClick={close} />
                    <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
                      <Link to="/dashboard" onClick={close} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-stone-100">
                        <LayoutDashboard size={16} /> My posts
                      </Link>
                      <Link to="/settings" onClick={close} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-stone-100">
                        <Settings size={16} /> Settings
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost ml-2 !py-2">
                Log in
              </Link>
              <Link to="/register" className="btn-primary !py-2">
                Sign up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="rounded-md p-2 md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-stone-200 bg-stone-50 px-4 py-3 md:hidden">
          <Link to="/" onClick={close} className="rounded-md px-3 py-2.5 text-sm hover:bg-stone-200/60">Home</Link>
          <Link to="/authors" onClick={close} className="rounded-md px-3 py-2.5 text-sm hover:bg-stone-200/60">Authors</Link>
          {user ? (
            <>
              <Link to="/posts/create" onClick={close} className="rounded-md px-3 py-2.5 text-sm hover:bg-stone-200/60">Write a post</Link>
              <Link to="/dashboard" onClick={close} className="rounded-md px-3 py-2.5 text-sm hover:bg-stone-200/60">My posts</Link>
              <Link to="/settings" onClick={close} className="rounded-md px-3 py-2.5 text-sm hover:bg-stone-200/60">Settings</Link>
              <button onClick={handleLogout} className="rounded-md px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={close} className="rounded-md px-3 py-2.5 text-sm hover:bg-stone-200/60">Log in</Link>
              <Link to="/register" onClick={close} className="rounded-md px-3 py-2.5 text-sm font-medium text-orange-700 hover:bg-stone-200/60">Sign up</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
