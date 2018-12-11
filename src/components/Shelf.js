import React from 'react'
import Book from "./Book";

const Shelf = ({books, title, changeShelf}) => {
    if (!books) {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <p>No Books On Shelf!</p>
                </div>
            </div>
        )
    } else {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">{
                    books.map((book) => {
                    return (<Book key={book.id}
                    id={book.id}
                    title={book.title}
                    changeShelf={changeShelf}
                    book={book}
                    />)
                })}
                </ol>
            </div>
        </div>
    )
}
}

export default Shelf