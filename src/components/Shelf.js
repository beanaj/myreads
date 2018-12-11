import React from 'react'
import Book from "./Book";

class Shelf extends React.Component {
    state = {};

    render() {
        let shelfBooks = [];
        if (this.props.books !== undefined) {
            shelfBooks = this.props.books.map((book) => {
                return <Book key={book.id}
                             id={book.id}
                             title={book.title}
                             changeShelf={this.props.changeShelf}
                             book={book}
                />
            });
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelfBooks}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf