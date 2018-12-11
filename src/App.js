import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelf'
import './App.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        books: [],
        shelfTitles: ['Currently Reading', 'Want to Read', 'Read'],
        shelfData: ['currentlyReading', 'wantToRead', 'read'],
        changeShelf: this.changeShelf
    };

    refreshBooks() {
        BooksAPI.getAll().then(books => this.setState({books}));
    }

    changeShelf = (book, shelf) => {
        if (book !== undefined) {
            BooksAPI.update(book, shelf).then(res => {
                this.refreshBooks();
            });
        }
    }

    componentDidMount() {
        this.refreshBooks();
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" render={()=>{
                        return(<div className="app">
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
                            <Link to='/search'>
                            <button>Add a book</button>
                            </Link>
                        </div>
                    </div>)}

                    }
                    />
                    <Route path="/search" render={()=>{
                        return(<div className="search-books">
                            <div className="search-books-bar">
                                <Link to='/'>
                                    <button className="close-search">Close</button>
                                </Link>
                                <div className="search-books-input-wrapper">
                                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                    <input type="text" placeholder="Search by title or author"/>

                                </div>
                            </div>
                            <div className="search-books-results">
                                <ol className="books-grid">
                                    
                                </ol>
                            </div>
                        </div>)
                    }

                    }
                    />
                </div>
            </Router>
        )
    }
}

export default BooksApp
