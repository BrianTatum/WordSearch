import React from 'react';

const WordRow = ({word, found}) =>
	<li className={ found ? 'alert alert-success' : 'alert alert-danger'} syle={{marginBottom: 3}} >
		<p>{word}</p>
	</li>

export default WordRow