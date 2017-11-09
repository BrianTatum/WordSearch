import React, { Component } from 'react';
import './bootstrap/bootstrap.min.css';
import './App.css';

import LoadGrid from './components/LoadGrid';
import WordSearch from './components/WordSearch';

class App extends Component {
  constructor() {
    super();
    this._getSearchString = this._getSearchString.bind(this);
    this._clearSearchGrid = this._clearSearchGrid.bind(this);
    this.state = {
      search: '',
    } 
  }

  render() {
    
    const appBody = this._loadAppBody();
    
    return (
      <div>
        <div className="container-fluid appheading d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col">
              <h1 className="text-center display-1">Word Search</h1>
              <h1 className="text-center">I hate word searches!</h1>
            </div>
          </div>
        </div>
        {appBody}
      </div>
    );
  }

  _loadAppBody() {
    if (this.state.search === '') {
      return <LoadGrid returnStrig={this._getSearchString}/>
    } else {
      return <WordSearch textString={this.state.search} clearGrid={this._clearSearchGrid} />
    }
  }

  _getSearchString (searchString) {
    this.setState({search: searchString});
  }

  _clearSearchGrid() {
    this.setState({search: ''});
  }

}

export default App;
