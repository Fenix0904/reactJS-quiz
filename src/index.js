import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BookstoreServiceProvider} from "./components/bookstore-service-context/bookstore-service-context";
import {BrowserRouter as Router} from 'react-router-dom';
import BookstoreService from "./services/bookstore-service";
import store from "./store";
import ErrorBoundary from "./components/error-boundry/error-boundary";
import App from "./components/app";

const bookStoreService = new BookstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BookstoreServiceProvider value={bookStoreService}>
                <Router>
                    <App/>
                </Router>
            </BookstoreServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
