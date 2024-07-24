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
      tablet: '768px',
      desktop: '1024px',
    },
    backgroundColor: {
      primary: 'var(--bg-primary)',
      secondary: 'var(--bg-secondary)',
      accent: 'var(--bg-accent)',
      overlay: 'var(--bg-overlay)',
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
    },
    borderRadius: {
      md: '5px',
      circle: '50%',
    },
  },
  plugins: [],
};
export default config;
