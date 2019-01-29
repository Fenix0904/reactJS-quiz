import React from 'react';
import './QuizCreator.css';
import Button from "../../UI/button/Button";

export default class QuizCreator extends React.Component {

    onSubmitHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = () => {

    };
    createQuizHandler = () => {

    };

    render() {
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Create Quiz</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <input/>
                        <hr/>
                        <input/>
                        <input/>
                        <input/>
                        <input/>
                        <select></select>
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >
                            Add question
                        </Button>
                        <Button
                            type="correct"
                            onClick={this.createQuizHandler}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}