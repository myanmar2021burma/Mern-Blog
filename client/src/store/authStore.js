// =====================================================
// Login အခြေအနေကို zustand နဲ့ စီမံတယ် (Provider မလို)
// =====================================================
import { create } from 'zustand';
import { api, STORAGE_KEY } from '../lib/api';

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

// create() က store တစ်ခုဆောက်ပြီး useAuth ဆိုတဲ့ hook ကို ပြန်ပေးတယ်
// component ထဲမှာ  const { user, profile, login, logout, refreshProfile } = useAuth();  လို့ သုံးမယ်
export const useAuth = create((set, get) => ({
  user: loadUser(), // { token, id, name } သို့ null
  profile: null, // avatar, email, posts ပါတဲ့ အပြည့်အစုံ

  login: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    set({ user: data });
    get().refreshProfile();
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, profile: null });
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;
    try {
      set({ profile: await api.users.get(user.id) });
    } catch {
      /* မရရင် ကျော်မယ် */
    }
  },
}));

// token သက်တမ်းကုန်ရင် (api.js က 'auth:expired' ပို့တယ်) အလိုအလျောက် logout
window.addEventListener('auth:expired', () => useAuth.getState().logout());

// App စဖွင့်ချိန် login ဝင်ထားပြီးသားဆိုရင် profile (avatar) ကို ယူမယ်
useAuth.getState().refreshProfile();
