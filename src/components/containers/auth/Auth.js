import React from 'react';
import './Auth.css';
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import {validate, validateForm} from "../../form/form-framevork";
import {connect} from "react-redux";
import {authenticate} from "../../../store/actions/auth";

class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: "Email",
                errorMessage: "You've entered an wrong email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: "Password",
                errorMessage: "You've entered wrong password",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {
        this.props.authenticate(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    registerHandler = () => {
        this.props.authenticate(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;

        this.setState({
            isFormValid: validateForm(formControls),
            formControls
        });
    };

    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Authorization</h1>

                    <form className='AuthForm' onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Button
                            type='correct'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Login
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (email, password, isLogin) => dispatch(authenticate(email, password, isLogin))
    }
};

export default connect(null, mapDispatchToProps)(Auth);