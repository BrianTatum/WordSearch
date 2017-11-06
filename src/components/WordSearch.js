import React, { Component } from 'react';

import GridLetter from './gridletter';
import WordRow from './WordRow';

export default class WordSerch extends Component {
  constructor() {
    super();
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state ={
      grid: [],
      wordList: []
    }
  }

  componentDidMount() {
    this._loadGrid();
  }

  render() {
    const searchGrid = this._buildSearchGrid();
    const searchedWordList = this._buildSearchedList();
    
    return (
      <div className="container">
        <div className="row row-spacing">
          <div className="col-md justify-content-center d-flex">
            <div className='grid-frame'>
              {searchGrid}
            </div>
          </div>
          <div className="col-md">
            <form onSubmit={this._handleSubmit}>
              <input type='text' className='form-control' ref={(w) => {this.word = w}} />
              <input type='submit' className='btn btn-primary' />
            </form>
            <h3>Searched Words</h3>
            <ul className="list-unstyled">
              {searchedWordList}
            </ul>
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

  _buildSearchedList() {
    return this.state.wordList.map((word, i) => {
      return <WordRow word={word.word} found={word.found} key={i} />
    })
  }

  _buildGridRow(gridRow) {
    let row = [];
    for(let i=0; i < gridRow.length; i++) {
      row.push(<GridLetter letter={gridRow[i].letter} word={gridRow[i].word} key={i} />);
    }
    return row;
  }

  _loadGrid() {
    let text = this.props.textString;
    let rows = text.match(/([a-zA-Z]+)/g);
    let grid = [];
    rows.forEach((row) => {
      grid.push(row.split(''));
    })
    grid.forEach((row) => {
      row.forEach((col, i, row) => {
        row[i] = {letter: col, word: false};
      });
    });
    this.setState({grid: grid});
  }

  _handleSubmit(e) {
    e.preventDefault();
    let found = false;
    let searchWordForward = this.word.value.toUpperCase();
    let searchWordBackward = this._revSearch(searchWordForward);
    //Search horizontal
    this.state.grid.forEach((row, x) => {
      let y = this._lineSearch(this._getRowString(this.state.grid[x]), searchWordForward, searchWordBackward);
      if (y >= 0) {
        this._markRow(x, y, searchWordForward.length);
        found = true;
      }
    });
    //Search vertical
    for(let x = 0; x < this.state.grid[0].length; x++){
      let y = this._lineSearch(this._getColString(x), searchWordForward, searchWordBackward);
      if(y >= 0) {
        this._markCol(x, y, searchWordForward.length);
        found = true;
      }
    }
    let searchedWords = this.state.wordList;
    searchedWords.push({word: searchWordForward, found: found});
    this.setState({wordList: searchedWords});
  }

  _revSearch(searchWord) {
    let revWord = '';
    for(let i = searchWord.length - 1; i > -1; i--) {
      revWord = revWord.concat(searchWord[i]);
    }
    return revWord;
  }

  _lineSearch(lineString, forwardSearch, backwardSearch) {
    let forward = lineString.indexOf(forwardSearch);
    let backward = lineString.indexOf(backwardSearch);
    if (forward >= 0 ){
      return forward;
    } else if (backward >= 0) {
      return backward;
    } else {
      return -1;
    }
  }

  _getRowString(line) {
    let lineString = '';
    line.forEach((col) => {lineString = lineString.concat(col.letter)});
    return lineString;
  }

  _getColString(y) {
    let lineString = '';
    for(let x = 0; x < this.state.grid[0].length; x++) {
      lineString = lineString.concat(this.state.grid[x][y].letter);
    }
    return lineString;
  }

  _markRow(x,y,wordLength) {
    let markedGrid = this.state.grid;
    for(let i = y; i<wordLength + y; i++){
      markedGrid[x][i].word = true;
    }
    this.setState({grid: markedGrid});
  }

  _markCol(x,y,wordLength) {
    let markedGrid = this.state.grid;
    for(let i = y; i < wordLength + y; i++) {
      markedGrid[i][x].word = true;
    }
    this.setState({grid: markedGrid});
  }
}