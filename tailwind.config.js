export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
      'display': ['Poppins', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        'lasalle-dark': '#1e3a8a',
        'lasalle-blue': '#2563eb',
        'lasalle-light-blue': '#3b82f6',
        'lasalle-yellow': '#fbbf24',
        'lasalle-white': '#ffffff',
        'slate-50': '#f8fafc',
        'slate-100': '#f1f5f9',
        'slate-200': '#e2e8f0',
        'slate-300': '#cbd5e1',
        'slate-400': '#94a3b8',
        'slate-500': '#64748b',
        'slate-600': '#475569',
        'slate-700': '#334155',
        'slate-800': '#1e293b',
        'slate-900': '#0f172a',
        'surface': '#ffffff',
        'danger': '#dc2626',
        'success': '#10b981',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(30, 58, 138, 0.08)',
        'lg': '0 20px 40px rgba(30, 58, 138, 0.12)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
