import React, { Component } from 'react'

import Book from './Book';


export default class BooksGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        {
          this.props.books.map((element) => <li key={element.id}> <Book
            details={element}
            updateShelf={this.props.updateShelf}
          /> </li>)
        }
      </ol>
    )
  }
}
