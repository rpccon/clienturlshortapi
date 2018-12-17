import React, { Component } from 'react'

import './style.sass'

import { 
  GENERAL_SELECTION,
  DROPDOWN_OPTION_A,
  DROPDOWN_OPTION_B,
  ONE
} from '../../helpers/strings'
import TopRecently from '../TopRecently/TopRecently'
import ShortestUrl from '../ShortestUrl/ShortestUrl'

class SelectionComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      action: ONE,
    }
  }

  onChangeClick(){
    this.setState({ action: !this.state.action })
  }

  render() {
    return (
      <div className={GENERAL_SELECTION}>
        <select onChange={() => this.onChangeClick()}>
          <option>{DROPDOWN_OPTION_A}</option>
          <option>{DROPDOWN_OPTION_B}</option>
        </select>
        {this.state.action ? <TopRecently /> : <ShortestUrl />}
      </div>
    )
  }
}

export default SelectionComponent