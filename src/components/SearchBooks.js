import React, { Component } from 'react'
import BooksGrid from './BooksGrid';

import { search } from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


export class SearchBooks extends Component {
  state = {
    query : '',
    searchResults: [],
  }
  static propTypes ={
    updateShelf: PropTypes.func.isRequired
  }
  searchBooks = async (query) =>{
    const results = await search(query);
    this.setState({
      searchResults: Array.isArray(results) ? results : [],
    })
  }
  onChange = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
    this.searchBooks(query);
  }
  
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" value = {this.state.query} onChange={(e) => { 
              this.onChange(e.target.value)
            }} placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.searchResults} updateShelf={this.props.updateShelf} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
