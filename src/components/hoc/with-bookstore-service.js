import React from 'react';
import {BookstoreServiceConsumer} from '../bookstore-service-context/bookstore-service-context';

const withBookstoreService = () => (WrappedComponent) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (service) => {
                        return (<WrappedComponent {...props} service={service}/>);
                    }
                }
            </BookstoreServiceConsumer>
        );
    };
};

export default withBookstoreService;