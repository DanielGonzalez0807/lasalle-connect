const variantClasses = {
  primary: 'bg-gradient-to-r from-lasalle-dark to-lasalle-blue text-white border border-transparent hover:shadow-lg hover:from-lasalle-blue hover:to-lasalle-light-blue focus-visible:ring-2 focus-visible:ring-lasalle-yellow focus-visible:ring-offset-2',
  secondary: 'bg-white text-lasalle-dark border-2 border-lasalle-dark hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-lasalle-yellow',
  danger: 'bg-red-500 text-white border border-transparent hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300',
  ghost: 'bg-transparent text-lasalle-dark border-2 border-slate-300 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-lasalle-yellow',
  outline: 'bg-white text-lasalle-dark border-2 border-lasalle-yellow hover:bg-lasalle-yellow/10 focus-visible:ring-2 focus-visible:ring-lasalle-yellow',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm font-medium',
  lg: 'px-6 py-3.5 text-base font-semibold',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center rounded-2xl font-display font-semibold shadow-md transition duration-200 ${variantClasses[variant] ?? variantClasses.primary} ${sizeClasses[size] ?? sizeClasses.md} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
