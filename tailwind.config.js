/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberBlack: '#25332B',
        cyberSurface: '#FFFDF8',
        cyberPanel: '#FFFFFF',
        cyberPanelSoft: '#FFF4E7',
        cyberBorder: '#EADBC9',
        cyberWhite: '#25332B',
        cyberGray: '#66736B',
        cyberGrayMuted: '#859087',
        cyberPurple: '#D96625',
        cyberPurpleSoft: '#E87B38',
        cyberTeal: '#4B8067',
        cyberYellow: '#E6A22F',
        cyberPanelDeep: '#F7F1E8',
        cyberPanelShade: '#F0E4D5',
        cyberPurpleLight: '#B9501C',
        cyberPurpleMuted: '#D17B50',
        cyberYellowSoft: '#F5C15C',
      },
      fontFamily: {
        sans: ['Ubuntu', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 20px 60px -50px rgba(0, 0, 0, 0.8)',
        glow: '0 30px 80px -70px rgba(0, 0, 0, 0.8)',
        'glow-md': '0 30px 80px -60px rgba(0, 0, 0, 0.8)',
        'glow-lg': '0 40px 120px -80px rgba(0, 0, 0, 0.8)',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '3xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
        wide: '0.2em',
        'wide-md': '0.22em',
        wider: '0.25em',
        mega: '0.3em',
        'mega-xl': '0.35em',
      },
    },
  },
  plugins: [],
}
