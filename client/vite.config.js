import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Backend CORS က http://localhost:5173 ကိုပဲ ခွင့်ပြုထားလို့ port ကို 5173 အတိအကျ သုံးထားတယ်
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
