import React from 'react';

class Book extends React.Component {
  render() {
    console.log("##############", this.props.details, "***************", this.props.details.imageLinks);
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128, height: 188, backgroundImage: `url("${this.props.details.imageLinks ?
              (this.props.details.imageLinks.thumbnail ?
                this.props.details.imageLinks.thumbnail : '')
              : ''}")`
          }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.props.details.shelf ? this.props.details.shelf : 'none'} onChange={(e) => {
              this.props.updateShelf(this.props.details, e.target.value)
            }}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.details.title}</div>
        <div className="book-authors">{this.props.details.authors ? this.props.details.authors.map(element => `${element}`).join(' ,'): ''}</div>
      </div>
    )
  }
}

export default Book;