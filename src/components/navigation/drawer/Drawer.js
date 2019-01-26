import React from 'react';
import './Drawer.css';

const links = [
    1, 2, 3
];

export default class Drawer extends React.Component {

    render() {
        const cls = ['Drawer'];
        if (!this.props.isOpen) {
            cls.push('close');
        }
        return (
            <nav className={cls.join(" ")}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
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
