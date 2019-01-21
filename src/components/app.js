import React from 'react';
import withBookstoreService from "./hoc/with-bookstore-service";

const App = ({service}) => {
  console.log(service.getBooks());
  return <div>App!</div>
};

export default withBookstoreService()(App);