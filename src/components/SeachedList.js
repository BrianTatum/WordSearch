import React, { Component } from 'react';

import WordRow from './WordRow';

export default class SearchedList extends Component {
	render () {
		const wordCol = this._getWordList();
		
		return (
			<div className="row">
				{wordCol}
			</div>
		)
	}

	_getWordList() {
		let wordCol = []
		let colNum = Math.ceil(this.props.words.length / 10);
		let sliceStart = 0;
		let sliceEnd = 10;
		for(let i = 1; i <= colNum; i++) {
			let col = this.props.words.slice(sliceStart, sliceEnd);
			wordCol.push(this._buildListCol(col, i));
			sliceStart += 10;
			sliceEnd += 10;
		}
		return wordCol;
	}

	_buildListCol(colWords, colNum){
		const searchedWordList = this._buildSearchedList(colWords);		

		return (
			<div className="col" key={colNum}>
				<ul className="list-unstyled">
			      {searchedWordList}
			    </ul>
			</div>
		)
	}

	_buildSearchedList(colWords) {
    return colWords.map((word, i) => {
      return <WordRow word={word.word} found={word.found} key={i} />
    })
  }
}
