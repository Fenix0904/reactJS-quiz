import React from 'react';
import './FinishedQuiz.css';
import Button from "../UI/button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = (props) => {
    const correctCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'correct') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className='FinishedQuiz'>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'wrong' ? 'fa-times' : 'fa-check',
                            props.results[quizItem.id]
                        ];
                        return (
                            <li key={index}>
                                <strong>{index + 1}.</strong>&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>
            <p>Correct {correctCount} from {props.quiz.length}</p>
            <div>
                <Button type="primary" onClick={props.onRetry}>Retry</Button>
                <Link to='/'>
                    <Button type="correct">Go to test list</Button>
                </Link>
            </div>
        </div>
    )
};

export default FinishedQuiz;