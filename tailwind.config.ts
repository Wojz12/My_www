import type { Config } from 'tailwindcss'

const theme = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
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
        // Ciepła, papierowa paleta w duchu anthropic.com / claude.ai.
        // Kolory tematyczne pochodzą ze zmiennych CSS (globals.css), więc
        // przełączają się razem z jasnym/ciemnym motywem.
        ivory: theme('bg'),
        oat: theme('surface'),
        sand: theme('sand'),
        line: theme('line'),
        ink: {
          DEFAULT: theme('ink'),
          soft: theme('ink-soft'),
          muted: theme('ink-muted'),
          faint: theme('ink-faint'),
        },
        clay: {
          DEFAULT: '#D97757',
          dark: theme('accent-text'),
          light: '#F3DED3',
        },
        // Stałe kolory, niezależne od motywu (stopka, blok CV, lightbox)
        night: '#141413',
        paper: '#FAF9F5',
        // "primary" zostaje jako alias akcentu – używany w treściach słowników
        primary: {
          50: '#FBF1EC',
          100: '#F6E2D8',
          200: '#EEC6B4',
          300: '#E3A487',
          400: theme('accent-text'),
          500: '#D97757',
          600: theme('accent-text'),
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
