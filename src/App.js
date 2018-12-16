import React, { Component } from 'react'
import './App.css'
import SelectionComponent from './components/SelectionComponent/SelectionComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SelectionComponent />
        </header>
      </div>
    );
  }
}

export default App;
