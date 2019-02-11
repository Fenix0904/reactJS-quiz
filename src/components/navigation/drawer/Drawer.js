import React from 'react';
import './Drawer.css';
import BackDrop from "../../UI/back-drop/BackDrop";
import {NavLink} from "react-router-dom";

export default class Drawer extends React.Component {

    render() {
        const cls = ['Drawer'];
        if (!this.props.isOpen) {
            cls.push('closed');
        }

        const backDrop = this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null;
        const links = [
            {to: '/', label: "Home", exact: true}
        ];

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: "Create quiz", exact: false});
            links.push({to: '/logout', label: "Logout", exact: false});
        } else {
            links.push({to: '/auth', label: "Auth", exact: false},);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {backDrop}
            </React.Fragment>
        );
    }

    renderLinks(links) {
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
