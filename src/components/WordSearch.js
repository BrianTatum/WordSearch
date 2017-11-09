import React, { Component } from 'react';

import GridLetter from './gridletter';
import SearchedList from './SeachedList';

export default class WordSerch extends Component {
  constructor() {
    super();
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state ={
      searchFor: '',
      grid: [],
      wordList: []
    }
  }

  componentDidMount() {
    this._loadGrid();
  }

  render() {
    const searchGrid = this._buildSearchGrid();
    
    return (
      <div className="container">
        <div className="row row-spacing">
          <div className="col-lg justify-content-center d-flex">
            <div className='grid-frame'>
              {searchGrid}
            </div>
          </div>
          <div className="col-lg">
            <form onSubmit={this._handleSubmit}>
              <label htmlFor="searchWord" className='h5'>Enter word to find:</label>
              <input autoFocus id='searchWord' name='searchWord' type='text' className='form-control' value={this.state.searchFor} onChange={(e)=> this.setState({searchFor: e.target.value})} />
              <div className="row">
                <div className="col">
                  <input type='submit' className='btn btn-primary btn-block' />
                </div>
                <div className="col">
                  <button className='btn btn-warning btn-block' onClick={this.props.clearGrid}>
                    Clear Search Grid
                  </button>
                </div>
              </div>
            </form>
            <h3>Searched Words</h3>
            <SearchedList words={this.state.wordList} />
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
    let searchWordForward = this.state.searchFor.toUpperCase();
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

    //Left Search Diagonal
    let x = 0;
    let y = 0;
    while(x < this.state.grid.length && y < this.state.grid[0].length) {
      let index = this._lineSearch(this._getDiagonalLeft(x,y), searchWordForward, searchWordBackward);
      if (index >= 0) {
        this._markDiagonalLeft(x - index, y + index, searchWordForward.length);
        found = true;
      }
      (x < this.state.grid.length - 1) ? x++ : y++;
    }

    //Right Search Diagonal
    x = 0;
    y = this.state.grid[0].length-1;
    while(x < this.state.grid.length && y >= 0) {
      let index = this._lineSearch(this._getDiagonalRight(x,y), searchWordForward, searchWordBackward);
      if (index >= 0) {
        this._markDiagonalRight(x - index, y - index, searchWordForward.length);
        found = true;
      }
      (x < this.state.grid.length - 1) ? x++ : y--;
    }

    //Record word searched.
    let searchedWords = this.state.wordList;
    searchedWords.push({word: searchWordForward, found: found});
    this.setState({wordList: searchedWords, searchFor: ''});
  }

  //Reverses the seach word.
  _revSearch(searchWord) {
    let revWord = '';
    for(let i = searchWord.length - 1; i > -1; i--) {
      revWord = revWord.concat(searchWord[i]);
    }
    return revWord;
  }


  //Seached the current string from the search grid for the word.
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

  //Returns the seach string from the seach grid.
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

  _getDiagonalLeft(startX, startY) {
    let x = startX;
    let y = startY;
    let diagonal = '';
    while(x >= 0 && y < this.state.grid[0].length) {
      diagonal = diagonal.concat(this.state.grid[x][y].letter);
      y++;
      x--;
    }
    return diagonal;
  }

  _getDiagonalRight(startX, startY) {
    let x = startX;
    let y = startY;
    let diagonal = '';
    while(x >= 0 && y >= 0) {
      diagonal = diagonal.concat(this.state.grid[x][y].letter);
      y--;
      x--;
    }
    return diagonal;
  }


  //Marks the boxes that contain the words with a color.
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

  _markDiagonalLeft(x, y, wordLength) {
    let markedGrid = this.state.grid;
    for(let i = 1; i <= wordLength; i++) {
      markedGrid[x][y].word = true;
      x--;
      y++;
    }
    this.setState({grid: markedGrid});
  }

   _markDiagonalRight(x, y, wordLength) {
    let markedGrid = this.state.grid;
    for(let i = 1; i <= wordLength; i++) {
      markedGrid[x][y].word = true;
      x--;
      y--;
    }
    this.setState({grid: markedGrid});
  }
}