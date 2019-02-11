import React from 'react';
import './Layout.css';
import MenuToggle from "../../navigation/menu-toggle/MenuToggle";
import Drawer from "../../navigation/drawer/Drawer";
import {connect} from "react-redux";

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
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.onMenuClose}
                    isAuthenticated={this.props.isAuthenticated}
                />
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


const mapStateToProps = (state) => {
   return {
       isAuthenticated: !!state.auth.token
   }
};

export default connect(mapStateToProps)(Layout);