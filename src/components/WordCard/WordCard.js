import React from 'react';
import './WordCard.css';

const WordCard = (props) => {    
    return (
        <li className='wordCard'>
            {/* 'props.word &&' makes sure a word is loaded in state before attempting to render */}
            <h4>{props.word && props.word.original}</h4>
            <p>correct answer count: {props.word && props.word.correct_count}</p>
            <p>incorrect answer count: {props.word && props.word.incorrect_count}</p>
        </li>
    )
}

export default WordCard;