import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelf'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        shelfTitles: ['Currently Reading', 'Want to Read', 'Read'],
        shelfData: ['currentlyReading', 'wantToRead', 'read'],
        changeShelf: this.changeShelf
    };

    refreshBooks(){
        BooksAPI.getAll().then(books => this.setState({books}));
    }

    changeShelf = (book, shelf) =>{
        if(book!==undefined){
            BooksAPI.update(book, shelf).then(res=>{
                this.refreshBooks();
            });
        }
    }

    componentDidMount(){
        this.refreshBooks();
    }

    render() {
        return (
            <div className="app">
                <Shelf
                    title={this.state.shelfTitles[0]}
                    books={this.state.books.filter(book =>{
                        return book.shelf === this.state.shelfData[0]
                    })}
                    changeShelf={this.changeShelf}
                />
                <Shelf
                    title={this.state.shelfTitles[1]}
                    books={this.state.books.filter(book =>{
                        return book.shelf === this.state.shelfData[1]
                    })}
                    changeShelf={this.changeShelf}
                />
                <Shelf
                    title={this.state.shelfTitles[2]}
                    books={this.state.books.filter(book =>{
                        return book.shelf === this.state.shelfData[2]
                    })}
                    changeShelf={this.changeShelf}
                />
            </div>
        )
    }
}

export default BooksApp
