import React from 'react'
 
const Column = ({ columnFields }) => {
  return (
    <tr> 
      {columnFields.map((elem) => (
        <th style={{ 'width': `${elem.width}rem` }} key={elem.label}>{elem.label}</th>
      ))}
    </tr>  
  )
}

export default Column