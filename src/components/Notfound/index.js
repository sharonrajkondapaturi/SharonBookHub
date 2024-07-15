import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720875640/Group_7484_NotFound_xbhuin.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/" style={{textDecoration: 'none'}}>
      <button type="button" className="back-home-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
