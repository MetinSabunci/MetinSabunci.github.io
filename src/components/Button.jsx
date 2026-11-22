import './Button.css'

/**
 * Renders a link when `href` is given, otherwise a button.
 * variant: 'solid' (lime) | 'ghost' (outlined)
 */
export default function Button({ href, variant = 'solid', children, className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim()
  const external = href && /^https?:/.test(href)
  const content = <span className="btn__label">{children}</span>

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <button className={classes} type="button" {...rest}>
      {content}
    </button>
  )
}
