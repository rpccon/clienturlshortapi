import React from 'react'
import axios from 'axios'
import './styles.sass'

const makeRequest = () => {
  axios.get(`https://urlshortapiserver.herokuapp.com/validateFullPath?url=https://www.facebook.com/128498481167735/photos/a.131241027560147/265760487441533/?type=3`)
  .then(res => {
    console.log('response')
    console.log(res)
  })
}

const MyComponent = () => {
  makeRequest()

  return (
    <div className="fatherDiv">
      <div className="divButtons">
        <button className="spaceBetween">Show recently URLs</button>
        <button>Input form</button>
      </div>
      <div className="workArea">
        area to work
      </div>
    </div>
  )
}

export default MyComponent