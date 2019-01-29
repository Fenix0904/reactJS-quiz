import React from 'react';
import './Input.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {

    const type = props.type || 'text';
    const cls = ['Input'];
    const htmlFor = `${type}--${Math.random()}`;

    const errorMessage = isInvalid(props) ? <span>{props.errorMessage || 'You entered invalid data!'}</span> : null;

    if (isInvalid(props)) {
        cls.push('invalid'.toString());
    }

    return (
        <div className={cls.join(" ")}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={type}
                value={props.value}
                onChange={props.onChangeListener}
            />
            {errorMessage}
        </div>
    )
};

export default Input;