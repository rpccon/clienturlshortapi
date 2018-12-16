import React, { Component } from 'react'

import TopRecently from '../TopRecently/TopRecently'
import ShortestUrl from '../ShortestUrl/ShortestUrl'

class SelectionComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      action: 1,
    }
  }

  onChangeClick(){

    this.setState({ action: !this.state.action })
  }

  render() {
    return(
      <div>
        <select onChange={() => this.onChangeClick()}>
          <option value="topRecently">Top recently visited Urls</option>
          <option value="genShortest">Generate shortest URL</option>
        </select>
        {this.state.action ? <TopRecently /> : <ShortestUrl />}
      </div>
    )
  }
}
export default SelectionComponent