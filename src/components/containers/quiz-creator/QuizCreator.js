import React from 'react';
import './QuizCreator.css';
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import {createControl} from "../../form/form-framevork";
import Select from "../../UI/select/Select";

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
        formControls: createFormControls()
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = () => {

    };

    createQuizHandler = () => {

    };

    onChangeHandler = (value, controlName) => {

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