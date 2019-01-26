import React from 'react';
import Layout from "./hoc/layout/Layout";
import Quiz from "./containers/quiz/Quiz";

const App = () => {
    return (
        <Layout>
            <Quiz/>
        </Layout>
    );
};

export default App;