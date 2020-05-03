import React, { Component } from 'react'
import BooksGrid from './BooksGrid';

import { search } from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


export class SearchBooks extends Component {
  state = {
    query : '',
    searchResults: {},
  }
  static propTypes ={
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
    updateShelf: PropTypes.func.isRequired
  }
  searchBooks = async (query, shelfs) =>{
    let results = await search(query);

    if(!Array.isArray(results)){
      results = [];
    }
    //Formatting the search results
    const searchResults = results.reduce((returnVal, element) => {
      returnVal[element.id] = element;
      return returnVal;
    }, {});
    //Checking the 
    const shelfValues = Object.keys(shelfs).reduce((returnVal, element) => {
      returnVal = {
        ...returnVal,
        ...shelfs[element].books
      };
      return returnVal;
    }, {});

    this.setState({
      searchResults: {
        ...searchResults,
        ...shelfValues
      },
    })
  }

  onChange = (query, shelfs) => {
    this.setState(() => ({
      query: query.trim()
    }))
    this.searchBooks(query, shelfs);
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
              this.onChange(e.target.value, this.props.shelfs)
            }} placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={Object.values(this.state.searchResults)} updateShelf={this.props.updateShelf} shelfs={this.props.shelfs} />
        </div>
      </div>
    )
  }
}

export default SearchBooks
