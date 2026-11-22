// =====================================================
// Backend နဲ့ ဆက်သွယ်တဲ့ function အားလုံး ဒီဖိုင်တစ်ခုထဲမှာ ရှိတယ် (axios သုံးထားတယ်)
// =====================================================
import axios from 'axios';

export const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const UPLOADS =
  import.meta.env.VITE_UPLOADS_URL || API.replace(/\/api\/?$/, '') + '/uploads';

export const STORAGE_KEY = 'blog_user'; // { token, id, name }

// axios instance — baseURL ကို တစ်ခါပဲ သတ်မှတ်ထားလို့ အောက်မှာ '/posts' လို့ပဲ ရေးရတယ်
const http = axios.create({ baseURL: API });

// ---------- Request interceptor ----------
// request တိုင်း မပို့ခင် token ရှိရင် Authorization header ထဲ အလိုအလျောက် ထည့်ပေးတယ်
http.interceptors.request.use((config) => {
  try {
    const token = JSON.parse(localStorage.getItem(STORAGE_KEY))?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    /* token မရှိရင် ကျော်မယ် */
  }
  return config;
});

// ---------- Response interceptor ----------
// error အားလုံးကို Error(message) တစ်မျိုးတည်း ပြောင်းပေးတယ် → page တွေက err.message ကိုပဲ ပြရင်ရ
function fail(message) {
  if (message.startsWith('Unauthorized')) {
    window.dispatchEvent(new Event('auth:expired')); // token သက်တမ်းကုန် → logout
  }
  return Promise.reject(new Error(message));
}

http.interceptors.response.use(
  (res) => {
    // Backend errorHandler က status code မမှန်ဘဲ (HTTP 200 နဲ့) { message, stack } ပြန်တတ်လို့
    // အောင်မြင်သလိုပေါ်နေတဲ့ response ကိုပါ ဒီမှာ ထပ်စစ်တယ်
    const data = res.data;
    const looksLikeError =
      data && typeof data === 'object' && !Array.isArray(data) && 'stack' in data && 'message' in data;
    if (looksLikeError) return fail(data.message || 'တစ်ခုခု မှားနေပါတယ်');
    return res;
  },
  (err) => {
    // Server ကို လုံးဝ မရောက်ရင် err.response မရှိဘူး
    if (!err.response) {
      return fail('Server ကို ချိတ်ဆက်မရပါ။ Backend run နေလား စစ်ကြည့်ပါ။');
    }
    return fail(err.response.data?.message || `Request failed (${err.response.status})`);
  }
);

// axios က { data, status, headers… } ပုံစံ ပြန်တာမို့ data ကိုပဲ ထုတ်ပေးတဲ့ helper
const unwrap = (promise) => promise.then((res) => res.data);

// FormData (ပုံပါတဲ့ request) ကို axios က multipart Content-Type နဲ့ အလိုအလျောက် ပို့ပေးတယ်။
// Content-Type ကို ကိုယ်တိုင် မထည့်ရ။
export const api = {
  auth: {
    register: (d) => unwrap(http.post('/users/register', d)),
    login: (d) => unwrap(http.post('/users/login', d)),
  },
  users: {
    list: () => unwrap(http.get('/users')),
    get: (id) => unwrap(http.get(`/users/${id}`)),
    changeAvatar: (file) => {
      const form = new FormData();
      form.append('avatar', file);
      return unwrap(http.post('/users/change-avatar', form));
    },
    edit: (d) => unwrap(http.patch('/users/edit-user', d)),
  },
  posts: {
    list: () => unwrap(http.get('/posts')),
    byCategory: (c) => unwrap(http.get(`/posts/categories/${encodeURIComponent(c)}`)),
    byUser: (id) => unwrap(http.get(`/posts/users/${id}`)),
    get: (id) => unwrap(http.get(`/posts/${id}`)),
    create: (form) => unwrap(http.post('/posts', form)),
    update: (id, form) => unwrap(http.patch(`/posts/${id}`, form)),
    remove: (id) => unwrap(http.delete(`/posts/${id}`)),
  },
};
