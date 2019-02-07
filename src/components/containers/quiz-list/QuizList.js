import React from 'react';
import './QuizList.css';
import {NavLink} from "react-router-dom";
import axios from "../../../axios/axios-quiz";
import Loader from "../../UI/loader/Loader";

export default class QuizList extends React.Component {

    state = {
        quizes: [],
        loading: true
    };

    async componentDidMount() {
        try {
            const response = await axios.get('quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test № ${index + 1}`
                })
            });

            this.setState({
                quizes,
                loading: false
            });
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
        const content = this.state.loading ? <Loader/> : this.renderQuizes();
        return (
            <div className='QuizList'>
                <div>
                    <h1>Quiz List</h1>
                    <ul>
                        {content}
                    </ul>
                </div>
            </div>
        );
    }
}