import React from 'react';
import Layout from "./hoc/layout/Layout";
import Quiz from "./containers/quiz/Quiz";
import {Route, Switch, withRouter} from "react-router-dom";
import Auth from "./containers/auth/Auth";
import QuizCreator from "./containers/quiz-creator/QuizCreator";
import QuizList from "./containers/quiz-list/QuizList";
import {connect} from "react-redux";
import Logout from "./Logout/Logout";
import {autoLogin} from "../store/actions/auth";

class App extends React.Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' component={QuizList}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' component={QuizList}/>
                </Switch>
            )
        }
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));