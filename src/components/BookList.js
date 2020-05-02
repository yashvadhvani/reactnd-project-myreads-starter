import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';


export default class BookList extends Component {
  static propTypes = {
    shelfs: PropTypes.shape({
      currentlyReading : PropTypes.shape({
        books: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired
      }),
      wantToRead : PropTypes.shape({
        books: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired
      }),
      read : PropTypes.shape({
        books: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired
      }),
    }),
    updateShelf : PropTypes.func.isRequired 
  }
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
