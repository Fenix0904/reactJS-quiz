import React from 'react';
import './book-list.css';
import BookListItem from "../book-list-item/book-list-item";
import {connect} from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import {booksLoaded} from "../../actions";
import compose from "../../utils/compose";

class BookList extends React.Component {

    componentDidMount() {
        const {service} = this.props;
        const data = service.getBooks();
        this.props.booksLoaded(data);
    }

    render() {
        const {books} = this.props;
        return (
            <ul>
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book}/></li>
                        )
                    })
                }
            </ul>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        books: state.books
    }
};

const mapDispatchToProps = {
    booksLoaded
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList);