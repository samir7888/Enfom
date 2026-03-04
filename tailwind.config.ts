import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';


const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}',
    // if you ever add a `src` directory or other folders, include them here
  ],
  theme: {
    extend: {},
  },

};

export default config;