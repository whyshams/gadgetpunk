/*eslint-disable*/

/* prettier-ignore */ import React from 'react'

/* prettier-ignore */ import { Banner } from 'payload/components'

/* prettier-ignore */ import './index.scss'

/* prettier-ignore */ const baseClass = 'before-dashboard'

/* prettier-ignore */ const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
    </div>
  )
}

export default BeforeDashboard
/*eslint-enable*/
