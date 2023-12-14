/* eslint-disable */

/* prettier-ignore */ import React, { forwardRef, Ref } from 'react'

/* prettier-ignore */ import classes from './index.module.scss'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  /* prettier-ignore */ ref?: Ref<HTMLDivElement>
}

/* prettier-ignore */ export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props

  return (
    <div
     /* prettier-ignore */ ref={ref}
      className={[
        classes.gutter,
        left && classes.gutterLeft,
        right && classes.gutterRight,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
})

Gutter.displayName = 'Gutter'

/*eslint-enable */
