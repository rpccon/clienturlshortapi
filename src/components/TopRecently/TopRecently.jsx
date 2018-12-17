import React, { Component } from 'react'
import axios from 'axios'

import './styles.sass'

import TextLink from '../TextLink/TextLink'
import ComponentsContainer from '../ComponentsContainer/ComponentsContainer'
import {
  SELECTED_PAG_STYLE,
  PAGINATION_STYLE,
  SEARCH_BOX_PLACE_HOLDER,
  TABLE_STYLE,
  CONTAINER_STYLE,
  SEARCH_BOX_STYLE,
  TOP_100_URL,
  SERVER_ERROR,
  TOP_100_CLASS,
  EMPTY_STRING,
  COLUMN_FIELDS,
  CERO,
  ONE
} from '../../helpers/strings'

const getTextLink = (link) => (<TextLink url={link} />)
const buildElementJson = (link, title) => ({ link, title })
const buildDataAsJson = (data) => (
  data.map((elem) => (buildElementJson(getTextLink(elem[0]), elem[1])))
)
const getTopRecentlyUrls = () => {
  return new Promise((resolve, reject) => {
    axios.get(TOP_100_URL)
    .then(
      res => {
        const dataSetsJson = buildDataAsJson(res.data)

        resolve(dataSetsJson)
      },
      error => {reject(error)}
    )
  })
}

class TopRecently extends Component {

  constructor(props){
    super(props)

    this.state = {
      datasets: [],
      successRequest: CERO,
      errorMessage: EMPTY_STRING,
    }
  }

  render() {
    const { errorMessage, datasets, successRequest } = this.state    
    const emptyValidation = datasets.length === CERO && !successRequest

    if(emptyValidation){

      getTopRecentlyUrls().then(
        resolve => {
          this.setState({ datasets: resolve, successRequest: ONE })
        },
        error => {
          this.setState({ errorMessage: SERVER_ERROR })
        }
      )
    }

    return (
      <div className={TOP_100_CLASS}>
        {errorMessage === EMPTY_STRING
        ?<ComponentsContainer
          tractNumber={5}
          maxItemsPag={5}
          columnFields={COLUMN_FIELDS}
          dataSets={datasets}
          searchBoxPlaceHolder={SEARCH_BOX_PLACE_HOLDER}
          containerStyle={CONTAINER_STYLE}
          selectedItemPagStyle={SELECTED_PAG_STYLE}
          paginationStyle={PAGINATION_STYLE}
          tableStyle={TABLE_STYLE}
          searchBoxStyle={SEARCH_BOX_STYLE}
        />
        : <h2>{errorMessage}</h2>}
      </div>
    )
  }
}

export default TopRecently