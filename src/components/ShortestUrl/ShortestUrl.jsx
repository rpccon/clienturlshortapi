import React, { Component } from 'react'
import axios from 'axios'

import './style.sass'

import TextLink from '../TextLink/TextLink'
import {
  VALIDATE_FULL_PATH,
  URL_NO_WORKING,
  SERVER_ERROR,
  EMPTY_STRING,
  URL_NO_INSERTED,
  INSERT_THE_URL,
  TYPE_TEXT,
  SHORT_COMPONENTS,
  INPUT_BOTTOM,
  PROCESS,
  ONE
} from '../../helpers/strings'

const createGetShortestUrl = (url) => {
  return new Promise((resolve, reject) => {
    axios.post(VALIDATE_FULL_PATH,{
      url
    })
    .then(
      res => {
        resolve(res.data)
      },
      error => {reject(error)}
    )
  })
}

class ShortestUrl extends Component {
  constructor(props){
    super(props)

    this.state = {
      insertedUrl: EMPTY_STRING,
      response: EMPTY_STRING,
      inputValue: EMPTY_STRING,
      action: ONE,
    }
  }

  updateContext(context){
    const inputValue = context.target.value

    this.setState({ inputValue })
  }

  processClick = () => {
    const finalValue = this.state.inputValue

    if(finalValue !== EMPTY_STRING){
 
      createGetShortestUrl(finalValue).then(
        resolve =>
        {
          const isRigthResponse = URL_NO_WORKING === resolve

          this.setState({ action: isRigthResponse, response: resolve, inputValue: EMPTY_STRING })
        },
        error => {
          this.setState({ response: SERVER_ERROR, inputValue: EMPTY_STRING })
        }
      )      
    } else {
      this.setState({ response: URL_NO_INSERTED })
    }
  }

  render() {
    const { inputValue, response, action } = this.state
    
    return (
      <div className={SHORT_COMPONENTS}>
        <input
          className={INPUT_BOTTOM}
          onChange={(context) => this.updateContext(context)}
          type={TYPE_TEXT}
          value={inputValue}
          placeholder={INSERT_THE_URL}>
        </input>
        <button onClick={this.processClick}>{PROCESS}</button>
        <TextLink action={action} url={response} />
      </div>
    )
  }
}

export default ShortestUrl