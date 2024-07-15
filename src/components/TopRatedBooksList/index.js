import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBooksList = props => {
  const {books} = props
  const {id, authorName, coverPic, title} = books
  return (
    <Link to={`/books/${id}`} style={{textDecoration: 'none'}}>
      <li className="list-contain">
        <img src={coverPic} className="cover-image" alt={title} />
        <h1 className="title">{title}</h1>
        <p className="author">{authorName}</p>
      </li>
    </Link>
  )
}

export default TopRatedBooksList
