import React from 'react'

import Row from '../Row/Row'
import Column from '../Column/Column'

const Table = (props) => {
  const { styleClass, columnFields, dataTable } = props

	return (
      <table className={styleClass}>
        <thead>
          <Column columnFields={columnFields} />      
        </thead>
        <tbody>
          <Row columnFields={columnFields} dataTable={dataTable} />
        </tbody>
      </table>
	)
}

export default Table