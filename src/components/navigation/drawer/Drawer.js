import React from 'react';
import './Drawer.css';
import BackDrop from "../../UI/back-drop/BackDrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', label: "Home", exact: true},
    {to: '/auth', label: "Auth", exact: false},
    {to: '/quiz-creator', label: "Create quiz", exact: false}
];

export default class Drawer extends React.Component {

    render() {
        const cls = ['Drawer'];
        if (!this.props.isOpen) {
            cls.push('closed');
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
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'active'}
                        onClick={this.props.onClose}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }
}
