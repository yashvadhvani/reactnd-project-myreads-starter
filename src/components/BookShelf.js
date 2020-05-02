import React from 'react'
import BooksGrid from './BooksGrid';


class BookShelf extends React.Component {

  render() {
    return (
    <div className="bookshelf" id={this.props.bookShelfId}>
      <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={this.props.books} updateShelf = {this.props.updateShelf} />
      </div>
   </div>
  )
  }
}

export default BookShelf;