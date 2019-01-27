import React from 'react';
import './QuizList.css';
import {NavLink} from "react-router-dom";

export default class QuizList extends React.Component {

    renderQuizes() {
        return [1, 2, 4].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                    <h1>Quiz List</h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        );
    }
}