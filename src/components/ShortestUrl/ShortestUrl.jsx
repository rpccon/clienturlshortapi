import React, { Component } from 'react'
import axios from 'axios'
import './style.sass'

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
          console.log('eerrrororor')
          console.log(error)
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
        <p>{this.state.response}</p>
      </div>

    )
  }
}

export default ShortestUrl