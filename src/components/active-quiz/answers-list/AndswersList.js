import React from 'react';
import './AndswersList.css';
import AnswerItem from "./answer-item/AnswerItem";

const AnswersList = (props) => (
    <ul className="AnswersList">
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    state={props.state ? props.state[answer.id] : null}
                    key={index}
                    answer={answer}
                    onAnswerClicked={props.onAnswerClicked}
                />
            )
        })}
    </ul>
);

export default AnswersList;
