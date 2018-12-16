import React, { Component } from 'react'
import axios from 'axios'

import './style.sass'

import TextLink from '../TextLink/TextLink'

const createGetShortestUrl = (Url) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://urlshortapiserver.herokuapp.com/validateFullPath?url=${Url}`)
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
      insertedUrl: "",
      response: "",
      inputValue: "",
      action: 1,
    }
  }

  updateContext(context){
    const inputValue = context.target.value

    this.setState({ inputValue })
  }

  processClick = () => {
    const finalValue = this.state.inputValue

    if(finalValue !== ""){
      
      createGetShortestUrl(finalValue).then(
        resolve =>
        {
          const newAction = "Url indicated doesn't work, make sure it's correct !"
          const isRigthResponse = newAction === resolve

          this.setState({ action: isRigthResponse, response: resolve, inputValue: "" })
        },
        error => {
          this.setState({ response: "There was an error with server connection !", inputValue: "" })
        }
      )      
    } else {
      this.setState({ response: "You need to insert an URL" })
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