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
} from '../../helpers/strings'






const createGetShortestUrl = (Url) => {
  return new Promise((resolve, reject) => {
    axios.post(VALIDATE_FULL_PATH,{
      "url": Url
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
      action: 1,
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
    return (
      <div className="shortComponents">
        <input className="inputBottom" onChange={(context) => this.updateContext(context)} type="text" value={this.state.inputValue} placeholder="Insert the URL"></input>
        <button onClick={this.processClick}>Process</button>
        <TextLink action={this.state.action} url={this.state.response} />
      </div>

    )
  }
}

export default ShortestUrl