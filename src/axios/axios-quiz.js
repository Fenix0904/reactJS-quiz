import axios from 'axios';

export default axios.create({
    baseURL: "https://react-quiz-76a7e.firebaseio.com/"
});