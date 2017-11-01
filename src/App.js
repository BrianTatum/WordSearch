import React, { Component } from 'react';
import './bootstrap/bootstrap.min.css';
import './App.css';

import GridLetter from './components/gridletter';

class App extends Component {
  constructor() {
    super();
    this.state ={
      grid: []
    }
  }

  componentDidMount() {
    this._loadGrid();
  }

  render() {
    const searchGrid = this._buildSearchGrid();
    
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Hello World</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md justify-content-center d-flex">
            <div className='grid-frame'>
              {searchGrid}
            </div>
          </div>
          <div className="col-md">
          </div>
        </div>
      </div>
    );
  }

  _buildSearchGrid() {
    let rows = [];
    this.state.grid.forEach((row, i) => {
      rows.push(<div className='grid-row' key={i}>{this._buildGridRow(row)}</div>);
    })
    return rows;

  }

  _buildGridRow(gridRow) {
    let row = [];
    for(let i=0; i < gridRow.length; i++) {
      row.push(<GridLetter letter={gridRow[i]} key={i} />);
    }
    return row;
  }

  _loadGrid() {
    let text = `MMMMMMMMMM\nDDDDDDDDDD\nEEEEEEEEEE\nFFFFFFFFFF\nMMMMMMMMMM\nMMMMMMMMMM\nMMMMMMMMMM\nMMMMMMMMMM\nMMMMMMMMMM\nMMMMMMMMMM\n`;
    let rows = text.match(/([a-zA-Z]+)/g);
    let grid = [];
    rows.forEach((row) => {
      grid.push(row.split(''));
    })
    this.setState({grid: grid});
  }
}

export default App;
