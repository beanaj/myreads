import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelf'
import './App.css'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: [],
        shelfTitles: ['Currently Reading', 'Want to Read', 'Read'],
        shelfData: ['currentlyReading', 'wantToRead', 'read']
    };

    refreshBooks() {
        BooksAPI.getAll().then(books => this.setState({books}));
    };

    refreshSearch(searchResults) {
        console.log(searchResults)
        let searchBooks = searchResults.map(searchBook => {
            this.state.books.forEach(book => {
                if (searchBook.id === book.id) {
                    searchBook.shelf = book.shelf;
                }
            })
            return searchBook
        })
        console.log(searchBooks);
        this.setState({searchBooks})

    }

    clearSearch() {
        this.setState({searchBooks: []})
    }

    changeShelf = (book, shelf) => {
        if (book !== undefined) {
            BooksAPI.update(book, shelf).then(res => {
                this.refreshBooks();
            });
        }
    };

    searchShelf = (search) => {
        if (search !== undefined) {
            BooksAPI.search(search).then(data => {
                console.log(data)
                this.refreshSearch(data);
            })
        }
    };

    handleKeyPress = event => {
        console.log(event.target.value)
        if (event.target.value.length < 1) {
            this.clearSearch();
        } else {
            this.searchShelf(event.target.value);
        }

    };

    componentDidMount() {
        this.refreshBooks();
    };

    render() {
        return (
            <BrowserRouter>
                <Switch>
                        <Route exact path="/" render={() => {
                            return (<div className="app">
                                <Shelf
                                    title={this.state.shelfTitles[0]}
                                    books={this.state.books.filter(book => {
                                        return book.shelf === this.state.shelfData[0]
                                    })}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title={this.state.shelfTitles[1]}
                                    books={this.state.books.filter(book => {
                                        return book.shelf === this.state.shelfData[1]
                                    })}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title={this.state.shelfTitles[2]}
                                    books={this.state.books.filter(book => {
                                        return book.shelf === this.state.shelfData[2]
                                    })}
                                    changeShelf={this.changeShelf}
                                />
                                <div className="open-search">
                                    <Link to='/search'
                                          onClick={this.clearSearch}>
                                        <button>Add a book</button>
                                    </Link>
                                </div>
                            </div>)
                        }

                        }
                        />
                        <Route exact path="/search" render={() => {
                            return (<div className="search-books">
                                <div className="search-books-bar">
                                    <Link to='/'>
                                        <button className="close-search">Close</button>
                                    </Link>
                                    <div className="search-books-input-wrapper">
                                        <input type="text" placeholder="Search by title or author"
                                               onKeyUp={this.handleKeyPress}/>
                                    </div>
                                </div>
                                <div className="search-books-results">
                                    <ol className="books-grid">
                                        <Shelf
                                            title='Search'
                                            books={this.state.searchBooks}
                                            changeShelf={this.changeShelf}
                                        />
                                    </ol>
                                </div>
                            </div>)
                        }

                        }
                        />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default BooksApp
