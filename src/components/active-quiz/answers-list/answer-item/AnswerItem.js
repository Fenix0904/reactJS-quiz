import React from 'react';
import './AnswerItem.css';

const AnswerItem = (props) => {

    let classes = 'AnswerItem';

    if (props.state) {
        classes += " " + props.state;
    }

    return (
      <li
          className={classes}
          onClick={() => props.onAnswerClicked(props.answer.id)}
      >
          {props.answer.text}
      </li>
    );
};

export default AnswerItem;