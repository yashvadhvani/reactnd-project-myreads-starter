import React, { Component } from 'react'

import Book from './Book';
import PropTypes from 'prop-types'


export default class BooksGrid extends Component {
  static propTypes = {
    updateShelf :  PropTypes.func.isRequired,
    books:PropTypes.array.isRequired
  }
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
