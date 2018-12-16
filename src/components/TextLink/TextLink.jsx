import React from 'react'

import './style.sass'

const TextLink = ({ action, url }) => (
  <div className="division">
    {action
      ?<p>{url}</p>
      :<a rel="noopener noreferrer" target="_blank" href={url}>{url}</a>}
  </div>
)

export default TextLink