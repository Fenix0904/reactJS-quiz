import React from 'react';
import './Quiz.css';
import ActiveQuiz from "../../active-quiz/ActiveQuiz";
import FinishedQuiz from "../../finished-quiz/FinishedQuiz";
import axios from "../../../axios/axios-quiz";
import Loader from "../../UI/loader/Loader";

class Quiz extends React.Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    };

    async componentDidMount() {
        console.log(this.props.match.params.id);
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({
                quiz,
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    onAnswerClicked = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'correct') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
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
        // const activeQuiz = (
        //     <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
        //                 question={this.state.quiz[this.state.activeQuestion].question}
        //                 onAnswerClicked={this.onAnswerClicked}
        //                 quizLength={this.state.quiz.length}
        //                 questionNumber={this.state.activeQuestion + 1}
        //                 state={this.state.answerState}
        //     />
        // );
        // const finishedQuiz = (
        //     <FinishedQuiz
        //                     results={this.state.results}
        //                     quiz={this.state.quiz}
        //                     onRetry={this.onRetry}
        //     />
        // );
        // const showLoader = this.state.loading ? <Loader/> : this.state.isFinished ? finishedQuiz : activeQuiz;
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h2>Answer the all questions</h2>
                    {
                        this.state.loading ?
                            <Loader/> :
                            this.state.isFinished ?
                                <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.onRetry}
                                />
                                :
                                <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                            question={this.state.quiz[this.state.activeQuestion].question}
                                            onAnswerClicked={this.onAnswerClicked}
                                            quizLength={this.state.quiz.length}
                                            questionNumber={this.state.activeQuestion + 1}
                                            state={this.state.answerState}
                                />
                    }
                </div>
            </div>
        )
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
}

export default Quiz;