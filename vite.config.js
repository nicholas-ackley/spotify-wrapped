import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
=======
export default defineConfig({
  plugins: [react()],
  base: '/spotify-wrapped/', // <-- add this line
})
>>>>>>> d2a1a1e91596cd2820ce43fef98327b72672483a
