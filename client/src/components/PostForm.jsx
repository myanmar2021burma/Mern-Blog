import { useState } from 'react';
import { ImagePlus, Loader2, Save } from 'lucide-react';
import { Alert } from './ui';
import { CATEGORIES, imgUrl } from '../lib/utils';

// CreatePost နဲ့ EditPost နှစ်ခုလုံး ဒီ form ကို မျှသုံးတယ်
export default function PostForm({ initial, submitLabel, requireThumbnail, onSubmit }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [category, setCategory] = useState(initial?.category || 'Uncategorized');
  const [description, setDescription] = useState(initial?.description || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.thumbnail ? imgUrl(initial.thumbnail) : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2_000_000) return setError('Thumbnail ကြီးလွန်းတယ် (2MB အောက် ရွေးပါ)။');
    setError('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (description.trim().length < 12) return setError('Content ကို အနည်းဆုံး စာလုံး ၁၂ လုံး ရေးပါ။');
    if (requireThumbnail && !file) return setError('Thumbnail ပုံ ရွေးပေးပါ။');

    // ပုံပါတဲ့အတွက် JSON မဟုတ်ဘဲ FormData နဲ့ ပို့ရတယ်
    const form = new FormData();
    form.append('title', title.trim());
    form.append('category', category);
    form.append('description', description);
    if (file) form.append('thumbnail', file);

    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5 sm:p-8">
      <Alert>{error}</Alert>

      <div>
        <label className="label">Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ခေါင်းစဉ် ရေးပါ" required />
      </div>

      <div>
        <label className="label">Category</label>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Thumbnail {!requireThumbnail && <span className="font-normal text-stone-400">(မပြောင်းချင်ရင် ထားခဲ့ပါ)</span>}</label>
        <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-stone-500 transition hover:border-orange-400 hover:bg-orange-50/40">
          {preview ? (
            <img src={preview} alt="preview" className="aspect-[16/8] w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-2 py-12 text-sm">
              <ImagePlus size={28} /> ပုံရွေးရန် နှိပ်ပါ (PNG / JPG, 2MB အောက်)
            </span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={pickFile} />
        </label>
      </div>

      <div>
        <label className="label">Content</label>
        <textarea
          className="input min-h-[260px] leading-relaxed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ဒီမှာ ရေးပါ…"
          required
        />
      </div>

      <div className="flex justify-end">
        <button className="btn-primary" disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {submitLabel}
        </button>
      </div>
    </form>
  );
}
