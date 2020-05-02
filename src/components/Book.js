import React from 'react';
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    updateShelf :  PropTypes.func.isRequired,
    details : PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  }
  render() {
    const {details, updateShelf } = this.props; 
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128, height: 188, backgroundImage: `url("${details.imageLinks ?
              (details.imageLinks.thumbnail ?
                details.imageLinks.thumbnail : '')
              : ''}")`
          }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={details.shelf ? details.shelf : 'none'} onChange={(e) => {
              updateShelf(details, e.target.value)
            }}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{details.title}</div>
        <div className="book-authors">{details.authors ? details.authors.map(element => `${element}`).join(' ,'): ''}</div>
      </div>
    )
  }
}

export default Book;