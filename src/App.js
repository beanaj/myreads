import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelf'
import './App.css'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import debounce from 'debounce'

const shelfTitles = ['Currently Reading', 'Want to Read', 'Read'];
const shelfData =  ['currentlyReading', 'wantToRead', 'read'];

class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: []
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

    clearSearch = ()=>{
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
        if(search.length <1){
            this.clearSearch();
            return;
        }
        if (search !== undefined) {
            BooksAPI.search(search).then(data => {
                if(data.error){
                    this.clearSearch();
                }else{
                    this.refreshSearch(data);
                }
            })
        }
    };

    handleKeyPress = event => {
        this.searchShelf(event.target.value);
    };

    componentDidMount() {
        this.refreshBooks();
        this.searchShelf = debounce(this.searchShelf, 1000);
    };

    render() {
        return (
            <BrowserRouter>
                <Switch>
                        <Route exact path="/" render={() => {
                            return (<div className="app">
                                <Shelf
                                    title={shelfTitles[0]}
                                    books={this.state.books.filter(book => {
                                        return book.shelf === shelfData[0]
                                    })}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title={shelfTitles[1]}
                                    books={this.state.books.filter(book => {
                                        return book.shelf === shelfData[1]
                                    })}
                                    changeShelf={this.changeShelf}
                                />
                                <Shelf
                                    title={shelfTitles[2]}
                                    books={this.state.books.filter(book => {
                                        return book.shelf === shelfData[2]
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
