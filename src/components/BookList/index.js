import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookList = props => {
  const {books} = props
  const {id, title, readStatus, rating, authorName, coverPic} = books

  return (
    <Link to={`/books/${id}`} style={{textDecoration: 'none'}}>
      <li className="book-list-details">
        <img src={coverPic} alt={title} className="book-list-image" />
        <div className="book-main-details">
          <h1 className="book-list-title">{title}</h1>
          <p className="book-list-author">{authorName}</p>
          <p className="book-list-average">
            Avg Rating:
            <BsFillStarFill fill="#FBBF24" className="star" /> {rating}
          </p>
          <p className="book-status-state">
            Status: <span className="book-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default BookList
