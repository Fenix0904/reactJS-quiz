import React from 'react';
import './Layout.css';
import MenuToggle from "../../navigation/menu-toggle/MenuToggle";
import Drawer from "../../navigation/drawer/Drawer";

class Layout extends React.Component{

    state = {
       menu: false
    };


    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    };

    onMenuClose = () => {
        this.setState({
            menu: false
        })
    };


    render() {
        return (
            <div className='Layout'>
                <Drawer isOpen={this.state.menu} onClose={this.onMenuClose}/>
                <MenuToggle
                    onToggle={this.toggleMenu}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;