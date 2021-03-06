import React from 'react'
class Book extends React.Component {
    state = {};

    handleShelfChange = event => {
        this.props.changeShelf(this.props.book, event.target.value)
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{width: 128, height: 193, backgroundImage: (this.props.book.imageLinks) ? `url(${this.props.book.imageLinks.thumbnail}`: 'url(src/img/book-cover-placeholder.jpg)'}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleShelfChange} value={this.props.book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="none">None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>

                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{(this.props.book.authors) ? (this.props.book.authors.join(' | ')) : 'No Author'}</div>
            </div>
        )
    }
}

export default Book