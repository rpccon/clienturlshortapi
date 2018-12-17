import React from 'react'

import './style.sass'

import {
  DIVISION,
  NOOPENER,
  TARGET_BLANK
} from '../../helpers/strings'

const validateLengthUrl = (url) => (
  url.length >=  60? `${url.substring(0,60)}...`: url
)
const TextLink = ({ action, url }) => (
  <div className={DIVISION}>
    {action
      ?<p>{url}</p>
      :<a rel={NOOPENER} target={TARGET_BLANK} href={url}>{validateLengthUrl(url)}</a>}
  </div>
)

export default TextLink