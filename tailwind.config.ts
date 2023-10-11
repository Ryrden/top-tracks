import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './Components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': "320px",
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '[2xl]': '1536px',
    },
    extend: {},
  },
  plugins: [],
}
export default config
