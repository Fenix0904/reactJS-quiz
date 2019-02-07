import React from 'react';
import './QuizList.css';
import {NavLink} from "react-router-dom";
import axios from "axios";

export default class QuizList extends React.Component {

    state = {
        quizes: []
    };

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-76a7e.firebaseio.com/quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test № ${index + 1}`
                })
            });

            this.setState({quizes});
        } catch (e) {
            console.log(e);
        }

    }

    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
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