import React from 'react';
import './WordCard.css';

const WordCard = (props) => {    
    return (
        <div className='wordCard'>
            {/* 'props.word &&' makes sure a word is loaded in state before attempting to render */}
            <p>{props.word && props.word.original}</p>
            <p>Correct responses: {props.word && props.word.correct_count}</p>
            <p>Incorrect responses: {props.word && props.word.incorrect_count}</p>
        </div>
    )
}

export default WordCard;