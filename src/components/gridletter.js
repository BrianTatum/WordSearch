import React from 'react';

const inWord = "grid-letter found text-center d-inline-block";
const notWord = "grid-letter text-center d-inline-block"

const GridLetter = ({letter, word}) =>
	<div className={word ? inWord : notWord}>
		{letter}
	</div>

export default GridLetter;