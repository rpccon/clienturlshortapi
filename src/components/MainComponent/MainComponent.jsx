import React, { Component } from 'react'
import axios from 'axios'
import './styles.sass'

import ComponentsContainer from '../ComponentsContainer/ComponentsContainer'

const selectedPagStyle = 'tableComp'
const paginationStyle = 'paginationStyle'
const searchBoxPlaceHolder = 'Search'
const tableStyle = 'tableByProvider'
const containerStyle = 'grayFont'
const searchBoxStyle = 'searchBoxStyle'
const columnFields = [
  { id:'url', label: 'Url', width: 1 },
  { id:'title', label: 'Title tag', width: 1 },
]
const buildDataAsJson = (data) => (
  data.map((elem) => ({ 'url': elem[0], 'title': elem[1]  }))
)
const getTopRecentlyUrls = (updateState) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://urlshortapiserver.herokuapp.com/top100`)
    .then(
      res => {
        const dataSetsJson = buildDataAsJson(res.data)

        resolve(dataSetsJson)
      },
      error => {reject(error)}
    )
  })
}

class MainComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      datasets: [],
      errorMessage: "",
    }
  }

  render() {
    const emptyValidation = this.state.datasets.length === 0 && this.state.errorMessage === ""
    
    if(emptyValidation){

      getTopRecentlyUrls().then(
        resolve =>
        {
          this.setState({ datasets: resolve })
        },
        error => {
          this.setState({ errorMessage: "There was an error with server connection !" })
        }
      )
    }

    return (
        
        <div className="top100Area">
          {this.state.errorMessage === ""
          ?<ComponentsContainer
            tractNumber={5}
            maxItemsPag={5}
            columnFields={columnFields}
            dataSets={this.state.datasets}
            searchBoxPlaceHolder={searchBoxPlaceHolder}
            containerStyle={containerStyle}
            selectedItemPagStyle={selectedPagStyle}
            paginationStyle={paginationStyle}
            tableStyle={tableStyle}
            searchBoxStyle={searchBoxStyle}
          />
          : <h2>{this.state.errorMessage}</h2>
          }
      </div>
    )
  }
}

export default MainComponent