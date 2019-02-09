import React from 'react';
import './ActiveQuiz.css';
import AnswersList from "./answers-list/AndswersList";

const ActiveQuiz = (props) => (
    <div className="ActiveQuiz">
        <p className='Question'>
            <span>
                <strong>{props.questionNumber}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.questionNumber} from {props.quizLength}</small>
        </p>
        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClicked={props.onAnswerClicked}/>
    </div>
);

export default ActiveQuiz;