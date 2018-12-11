import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/Shelf'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        shelfTitles: ['Currently Reading', 'Want to Read', 'Read'],
        shelfData: [{'Currently Reading':'currentlyReading'}, {'Want To Read':'wantToRead'}, {'Read':'read'}]
    };

    changeShelf(bookID){

    }

    async componentDidMount(){
        BooksAPI.getAll().then(books => this.setState({books}));

    }

    render() {
        return (
            <div className="app">
                <Shelf
                    title={this.state.shelfTitles[0]}
                    books={this.books}
                />
                <Shelf
                    title={this.state.shelfTitles[1]}
                />
                <Shelf
                    title={this.state.shelfTitles[2]}
                />
            </div>
        )
    }
}

export default BooksApp
