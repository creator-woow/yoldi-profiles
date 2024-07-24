import type { Config } from 'tailwindcss';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      sm: ['12px', '19px'],
      md: ['16px', '25px'],
      lg: ['18px', '25px'],
    },
    screens: {
      tablet: {
        raw: '(min-width: 768px) and (min-height:960px)',
      },
      desktop: {
        raw: '(min-width: 1024px) and (min-height:768px)',
      },
    },
    backgroundColor: {
      primary: 'var(--bg-primary)',
      secondary: 'var(--bg-secondary)',
      accent: 'var(--bg-accent)',
      overlay: 'var(--bg-overlay)',
      transparent: 'transparent',
    },
    borderWidth: {
      1: '1px',
    },
    borderColor: {
      primary: 'var(--border-primary)',
      accent: 'var(--border-accent)',
      danger: 'var(--danger)',
    },
    textColor: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      placeholder: 'var(--text-placeholder)',
      white: '#ffffff',
      danger: 'var(--danger)',
      'bg-accent-contrast': 'var(--text-bg-accent-contrast)',
    },
    borderRadius: {
      md: '5px',
      circle: '50%',
    },
  },
  plugins: [],
};
export default config;
