import React from 'react'

const EmptyDataMessage = (metaFields) => (
  <tr>
    <td style={{ width: `${metaFields[0].width}rem`}}><b>There are not elements to show</b></td>
    {[...Array(metaFields.length).keys()].slice(1).map((number) => {
      return (
        <td style={{ width: `${metaFields[number].width}rem`}} key={number} />
      )
    })}
  </tr>
)

const Row = ({ dataTable, columnFields }) => {
  if(dataTable.length === 0) return EmptyDataMessage(columnFields)

  return (
    dataTable.map((item, index) => (
      <tr key={index}>
        {item.map((subItem, position) => (
            <td  key={position}>{subItem}</td>
          ))}
      </tr>      
    ))
  )
}

export default Row