import React, { Component } from 'react'
import { pick } from 'lodash'

import SearchBox from './SearchBox/SearchBox'
import TablePaginationComponent from './TablePaginationComponent/TablePaginationComponent'

const  _filterBySearchDataSets = (search, dataSets) => (
  dataSets.filter((item) => {
    
    const values = Object.values(item)
    const resultOfSearch = values.filter((elem) => {
      const elemLowerCase = elem.toString().toLowerCase()
      const searchLowerCase = search.toLowerCase()
      const areTheSame = elemLowerCase === searchLowerCase
      const findInSearch =  areTheSame || elem.toString().toLowerCase().search(search.toLowerCase())

      return findInSearch >= 0 && typeof elem === 'string'
    })

    return resultOfSearch.length > 0
  })
)
class ComponentsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchWord: '',
      dataSets: _filterBySearchDataSets('', props.dataSets)
    }
  }

  componentWillReceiveProps({ dataSets }){

    this.setState({ dataSets: _filterBySearchDataSets('', dataSets) })  
  }

  _updateSearchWord = (context) => {
    const searchWord = context.target.value
    const dataSets = _filterBySearchDataSets(searchWord, this.props.dataSets)

    this.setState({ dataSets, searchWord })
  }

  render() {

    return (
      <div className={this.props.containerStyle}>
        <SearchBox {...pick(this.props, ['searchBoxStyle', 'searchBoxPlaceHolder'])} onSearchChange={this._updateSearchWord} />
        <TablePaginationComponent
          dataSets = {this.state.dataSets}
          {...pick(this.props,
            [
              'containerStyle',
              'tableStyle',
              'columnFields',
              'paginationStyle',
              'tractNumber',
              'maxItemsPag',
              'selectedItemPagStyle',
            ])}
          searchWord={this.state.searchWord}
        />
      </div>
    )
  }
}

export default ComponentsContainer