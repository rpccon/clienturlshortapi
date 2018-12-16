import React, { Component } from 'react'
import axios from 'axios'

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
          this.setState({ response: resolve, inputValue: "" })
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
      <div>
        <div>
          <input onChange={(context) => this.updateContext(context)} type="text" value={this.state.inputValue} placeholder="Insert the URL"></input>
          <label>{this.state.response}</label>
        </div>
        <button onClick={this.processClick}>Process</button>
      </div>

    )
  }
}

export default ShortestUrl