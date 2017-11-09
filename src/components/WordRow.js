import React from 'react';

const WordRow = ({word, found}) =>
	<li className={ found ? 'word-found' : 'word-not-found'} >
		<p style={{marginBottom: 3}}>{word}</p>
	</li>

export default WordRow