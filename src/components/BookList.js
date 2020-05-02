import React, { Component } from 'react'
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom'

export default class BookList extends Component {

  render() {
    const {
      shelfs,
      updateShelf
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              Object.keys(shelfs).map((element) => <BookShelf
                key={element}
                bookShelfId={element}
                bookShelfName={shelfs[element].name}
                books={Object.values(shelfs[element].books)}
                updateShelf={updateShelf}
              />)
            }
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' />
        </div>
      </div>
    )
  }
}
