import React from 'react';
import './Drawer.css';
import BackDrop from "../../UI/back-drop/BackDrop";

const links = [
    1, 2, 3
];

export default class Drawer extends React.Component {

    render() {
        const cls = ['Drawer'];
        if (!this.props.isOpen) {
            cls.push('close');
        }

        const backDrop = this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null;
        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {backDrop}
            </React.Fragment>
        );
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
                </li>
            )
        })
    }
}
