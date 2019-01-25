import React from 'react';
import './Quiz.css';
import ActiveQuiz from "../../active-quiz/ActiveQuiz";
import FinishedQuiz from "../../finished-quiz/FinishedQuiz";

class Quiz extends React.Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Some question?',
                correctAnswerId: 2,
                answers: [
                    {id: 1, text: "Answer 1"},
                    {id: 2, text: "Answer 2"},
                    {id: 3, text: "Answer 3"},
                    {id: 4, text: "Answer 4"}
                ]
            },
            {
                id: 2,
                question: 'Some question number 2?',
                correctAnswerId: 3,
                answers: [
                    {id: 1, text: "Answer 1"},
                    {id: 2, text: "Answer 2"},
                    {id: 3, text: "Answer 3"},
                    {id: 4, text: "Answer 4"}
                ]
            }
        ]
    };

    onAnswerClicked = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'correct') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results;

        if (question.correctAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'correct';
            }
            this.setState({
                answerState: {[answerId]: 'correct'},
                results
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        answerState: null,
                        activeQuestion: this.state.activeQuestion + 1
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'wrong';
            this.setState({
                answerState: {[answerId]: 'wrong'},
                results
            });
        }
    };

    onRetry = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    };

    render() {
        const activeQuiz = (
            <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClicked={this.onAnswerClicked}
                        quizLength={this.state.quiz.length}
                        questionNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
            />
        );
        const finishedQuiz = (
            <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.onRetry}
            />
        );
        const content = this.state.isFinished ? finishedQuiz : activeQuiz;
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h2>Answer the all questions</h2>
                    {content}
                </div>
            </div>
        )
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
}

export default Quiz;