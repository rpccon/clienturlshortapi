import React from 'react'

import Pagination from './Pagination/Pagination'
import Table from './CustomTable/Table/Table'
import enhancer from './tablePaginationComponent.enhancer'

const END_BUTTONS_PAG = 4

const TablePaginationComponent = (props) => {
  const {
    containerStyle,
    tableStyle,
    columnFields,
    onClickPagination,
    paginationStyle,
    state: { values: { dataTable, tractBuilt, activeNumberPag }}
  } = props

  return  (
    <div className={containerStyle}>
      <Table
        styleClass={tableStyle}
        columnFields={columnFields}
        dataTable={dataTable}
      />
      {tractBuilt.length
        && (tractBuilt.length - END_BUTTONS_PAG) > 1
        && <Pagination
          onClickPagination={onClickPagination}
          styleClass={paginationStyle}
          tractBuilt={tractBuilt}
          active={activeNumberPag}
        />
      }
    </div>
  )
}

export default enhancer(TablePaginationComponent)