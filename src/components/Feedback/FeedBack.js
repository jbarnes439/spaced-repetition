import React from 'react';
import './Feedback.css'

const Feedback = (props) => {

    return (
        (props.correctAnswer) ?
            <div className='wordCard'>
                <h2>You were correct! :D</h2>
                <p>
                    The correct translation for {props.prevWord && props.prevWord} was {props.prevAnswer && props.prevAnswer} and you
                    chose {props.prevAnswer && props.prevAnswer}!
                </p>
                <button onClick={props.nextQuestion}>Try another word!</button>
            </div>
            :
            <div className='wordCard'>
                <h2>{'Good try, but not quite right :('}</h2>
                <p>
                    The correct translation for {props.prevWord && props.prevWord}
                    was {props.actualAnswer && props.actualAnswer} and you chose {props.userAnswer && props.userAnswer}!
                </p>
                <button onClick={props.nextQuestion}>Try another word!</button>
            </div>
    )

}

export default Feedback;