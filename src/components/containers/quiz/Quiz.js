import React from 'react';
import './Quiz.css';
import ActiveQuiz from "../../active-quiz/ActiveQuiz";
import FinishedQuiz from "../../finished-quiz/FinishedQuiz";
import Loader from "../../UI/loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../../store/actions/quiz";

class Quiz extends React.Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        // in order to reset current quiz progress
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h2>Answer the all questions</h2>
                    {
                        this.props.loading || !this.props.quiz ?
                            <Loader/> :
                            this.props.isFinished ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                :
                                <ActiveQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                                            question={this.props.quiz[this.props.activeQuestion].question}
                                            onAnswerClicked={this.props.quizAnswerClick}
                                            quizLength={this.props.quiz.length}
                                            questionNumber={this.props.activeQuestion + 1}
                                            state={this.props.answerState}
                                />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);