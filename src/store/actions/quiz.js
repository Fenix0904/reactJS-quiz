import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ,
    MOVE_TO_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

export function fetchQuizes() {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test № ${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes));
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`quizes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    };
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        payLoad: quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        payLoad: error
    };
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        payLoad: quiz
    };
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'correct') {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'correct';
            }
            dispatch(quizSetState({[answerId]: 'correct'}, results));
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(moveToNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'wrong';
            dispatch(quizSetState({[answerId]: 'wrong'}, results));
        }
    };

    function isQuizFinished(state) {
        return state.activeQuestion + 1 === state.quiz.length;
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        payLoad: {
            answerState,
            results
        }
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,

    }
}

export function moveToNextQuestion(nextQuestionNumber) {
    return {
        type: MOVE_TO_NEXT_QUESTION,
        payLoad: nextQuestionNumber
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY,
    }
}



