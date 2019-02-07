import React from 'react';
import './QuizCreator.css';
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import {createControl, validate, validateForm} from "../../form/form-framevork";
import Select from "../../UI/select/Select";
import axios from 'axios';

function createControlOptions(number) {
    return createControl({
        label: `Enter answer № ${number}`,
        errorMessage: "Cannot be empty!",
        id: number
    }, {required: true});
}

function createFormControls() {
    return {
        question: createControl({
            label: "Enter question",
            errorMessage: "Question cannot be empty!"
        }, {required: true}),
        option1: createControlOptions(1),
        option2: createControlOptions(2),
        option3: createControlOptions(3),
        option4: createControlOptions(4)
    }
}

export default class QuizCreator extends React.Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    createQuizHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://react-quiz-76a7e.firebaseio.com/quizes.json', this.state.quiz);
            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            });
        } catch (e) {
            console.log(e);
        }
    };

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    onSelectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    renderInputControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event) => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    };

    render() {
        const select = <Select
            label="Choose correct answer"
            value={this.state.rightAnswerId}
            onChange={this.onSelectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />;
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Create Quiz</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        {this.renderInputControls()}
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type="correct"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}