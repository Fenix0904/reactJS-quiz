import React from 'react';
import './Auth.css';
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";

export default class Auth extends React.Component {

    loginHandler = () => {

    };

    registerHandler = () => {

    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Authorization</h1>

                    <form className='AuthForm' onSubmit={this.submitHandler}>
                        <Input
                            errorMessage="Test"
                            label="Email"
                        />
                        <Input label="Password"/>
                        <Button
                            type='correct'
                            onClick={this.loginHandler}
                        >
                            Login
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}