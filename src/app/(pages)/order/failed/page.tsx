/*eslint-disable*/

import React from 'react'
import { Gutter } from '../../../_components/Gutter'
import Image from 'next/image'

import classes from './index.module.scss'

const page = () => {
  return (
    <div>
      <Gutter className={classes.failed}>
        <div>
          <Image src="/sad.png" alt="sad" height={150} width={150} />
        </div>
        <div className={classes.failed_text}>
          <h3>
            Sorry, there were some problem while making the payment, Please choose other payment
            method or contact gadgetpunk.
          </h3>
        </div>
      </Gutter>
    </div>
  )
}

export default page

/*eslint-enable*/
