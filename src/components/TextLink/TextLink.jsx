import React from 'react'

import './style.sass'

const validateLengthUrl = (url) => (
  url.length >=  60? `${url.substring(0,60)}...`: url
)
const TextLink = ({ action, url }) => (
  <div className="division">
    {action
      ?<p>{url}</p>
      :<a rel="noopener noreferrer" target="_blank" href={url}>{validateLengthUrl(url)}</a>}
  </div>
)

export default TextLink