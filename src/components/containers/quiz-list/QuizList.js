import React from 'react';
import './QuizList.css';
import {NavLink} from "react-router-dom";
import Loader from "../../UI/loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../../store/actions/quiz";

class QuizList extends React.Component {

    componentDidMount() {
        this.props.fetchQuizes();
    }

    renderQuizes() {
        return this.props.quizes.map((quiz) => {
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
        const content = this.props.loading && this.props.quizes.length !== 0 ? <Loader/> : this.renderQuizes();
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

const mapStateToProps = (state) => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
};

 const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuizList);