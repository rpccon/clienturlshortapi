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
const getTopRecentlyUrls = () => {
  return new Promise((resolve, reject) => {
    axios.get(`https://urlshortapiserver.herokuapp.com/top100`)
    .then(res => {
      const dataSetsJson = buildDataAsJson(res.data)

      resolve(dataSetsJson)
    })
  });

}

class MyComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      datasets: []
    }
  }

  render() {
    if(this.state.datasets.length === 0){
      
      getTopRecentlyUrls().then((resolve, reject) => {
        if(resolve){
          this.setState({ datasets: resolve })
        }
       
      })
    }

    return (
        <div className="top100Area">
          <ComponentsContainer
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

      </div>
    )
  }
}

export default MyComponent