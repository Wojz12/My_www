import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Słowniki zawierają fragmenty HTML z klasami (np. text-primary-400)
    './src/dictionaries/**/*.json',
  ],
  theme: {
    extend: {
      colors: {
        // Ciepła, papierowa paleta w duchu anthropic.com / claude.ai
        ivory: '#FAF9F5',
        oat: '#F0EEE6',
        sand: '#E8E6DC',
        line: '#DEDBD0',
        ink: {
          DEFAULT: '#141413',
          soft: '#3D3D3A',
          muted: '#5E5D59',
          faint: '#87867F',
        },
        clay: {
          DEFAULT: '#D97757',
          dark: '#B85A3B',
          light: '#F3DED3',
        },
        // "primary" zostaje jako alias akcentu – używany w treściach słowników
        primary: {
          50: '#FBF1EC',
          100: '#F6E2D8',
          200: '#EEC6B4',
          300: '#E3A487',
          400: '#B85A3B',
          500: '#D97757',
          600: '#B85A3B',
          700: '#9A4A30',
          800: '#7A3A26',
          900: '#5C2C1D',
          950: '#3A1C12',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      maxWidth: {
        page: '76rem',
      },
    },
  },
  plugins: [],
}

export default config
