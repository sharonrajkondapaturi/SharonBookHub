import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetailsRoute extends Component {
  state = {currentApiStatus: apiStatus.initial, bookDeatils: []}

  componentDidMount() {
    this.onRender()
  }

  onRender = async () => {
    this.setState({currentApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookId = id
    const jwtToken = Cookies.get('jwt_token')
    const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(bookDetailsApi, options)
    const data = await response.json()
    if (response.ok === true) {
      const bookData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        bookDeatils: bookData,
        currentApiStatus: apiStatus.success,
      })
    } else {
      this.setState({currentApiStatus: apiStatus.failure})
    }
  }

  onRetry = () => {
    this.onRender()
  }

  onLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onFailure = () => (
    <div className="failure-view-detail-container">
      <img
        src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720725568/Group_7522_failureHome_pmjt6l.png"
        alt="failure view"
        className="failure-view-detail"
      />
      <p className="failure-para-detail">
        Something went wrong, Please try again.
      </p>
      <button type="button" className="try-again-button" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  onSuccess = () => {
    const {bookDeatils} = this.state
    const {
      authorName,
      coverPic,
      title,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDeatils
    return (
      <div className="detail-background-container">
        <div className="detail-container">
          <div className="book-detail">
            <img src={coverPic} alt={title} className="book-detail-image" />
            <div className="book-main-detail">
              <h1 className="book-detail-title">{title}</h1>
              <p className="book-detail-author">{authorName}</p>
              <p className="book-detail-average">
                Avg Rating:
                <BsFillStarFill fill="#FBBF24" className="detail-star" />{' '}
                {rating}
              </p>
              <p className="book-status-detail">
                Status:{' '}
                <span className="book-current-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="line" />
          <div className="about-details">
            <h1 className="about">About Author</h1>
            <p className="about-para">{aboutAuthor}</p>
            <h1 className="about">About Book</h1>
            <p className="about-para">{aboutBook}</p>
          </div>
        </div>
        <div className="logos-books">
          <FaGoogle className="icons" />
          <FaTwitter className="icons" />
          <FaInstagram className="icons" />
          <FaYoutube className="icons" />
        </div>
        <p className="contact-us">Contact us</p>
      </div>
    )
  }

  onRenderStatus = () => {
    const {currentApiStatus} = this.state
    switch (currentApiStatus) {
      case apiStatus.inProgress:
        return this.onLoading()
      case apiStatus.success:
        return this.onSuccess()
      case apiStatus.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.onRenderStatus()}
      </div>
    )
  }
}
export default BookDetailsRoute
