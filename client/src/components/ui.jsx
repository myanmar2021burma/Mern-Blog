import { AlertCircle, CheckCircle2, FileText, Loader2 } from 'lucide-react';

export function Loader({ text = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-20 text-stone-500">
      <Loader2 className="animate-spin" size={20} /> {text}
    </div>
  );
}

export function Alert({ type = 'error', children }) {
  if (!children) return null;
  const ok = type === 'success';
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border px-3.5 py-3 text-sm ${
        ok ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {ok ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}

export function EmptyState({ title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
      <FileText size={36} className="text-stone-300" />
      <h3 className="mt-3 font-serif text-lg font-semibold">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-stone-500">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
