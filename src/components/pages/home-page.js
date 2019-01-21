import React from 'react';
import BookList from "../book-list/book-list";

const HomePage = () => {
    const books = [
        {id: 1, title: "Test Book 1", author: "Test author 1"},
        {id: 2, title: "Test Book 2", author: "Test author 2"}
        ];

    return (
        <BookList books={books}/>
    );
};

export default HomePage;