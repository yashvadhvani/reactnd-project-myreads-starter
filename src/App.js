import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './components/SearchBooks';
import BookList from './components/BookList';
import { update, getAll } from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    shelfs: {
      currentlyReading : {
        books: {}, 
        name : 'Currently Reading'
      },
      wantToRead : {
        books: {},
        name : 'Want to Read' 
      },
      read : {
        books: {},
        name: 'Read'
      }
    },
  }

  async componentDidMount() {
    const result = await getAll();
    const shelfs = {
      ...this.state.shelfs
    };
    result.forEach(element => {
      shelfs[element.shelf].books[element.id] = element;  
    });
    this.setState({
      shelfs
    })
  }

  updateShelf = async(book, shelf) => {
    const shelfs = {
      ...this.state.shelfs
    };

    Object.keys(shelfs).forEach((element)=> {
        delete shelfs[element].books[book.id]; 
    });
    if(shelfs[shelf]){
      book.shelf = shelf;
      shelfs[shelf].books[book.id] = book;
    }    
    this.setState({
      shelfs
    });
    await update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={({history}) => (
          <SearchBooks 
            shelfs ={{...this.state.shelfs}}
            updateShelf = {async (book, shelf) => {
              await this.updateShelf(book, shelf);
              history.push('/');
            }}
            />
        )} />
        <Route exact path='/' render={() => (
         <BookList shelfs ={{...this.state.shelfs}} updateShelf= {this.updateShelf}/>
        )} />
      </div>
    )
  }
}


export default BooksApp
