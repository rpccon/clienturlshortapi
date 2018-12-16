import React from 'react'

const TextLink = (props) => {
  const { action, url } = props
  console.log('props')
  
  return (
    action ? <p>{url}</p> : <a rel="noopener noreferrer" target="_blank" href={url}>{url}</a>
  )
}

export default TextLink