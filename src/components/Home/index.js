import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import TopRatedBooksList from '../TopRatedBooksList'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [currentApiStatus, setApiStatus] = useState(apiStatus.initial)
  const [booksData, setBooks] = useState([])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const onRender = async () => {
    setApiStatus(apiStatus.inProgress)
    const topRatedBooksApiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(topRatedBooksApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const bookDetails = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      setApiStatus(apiStatus.success)
      setBooks(bookDetails)
    } else {
      setApiStatus(apiStatus.failure)
    }
  }
  const onRetry = () => {
    onRender()
  }
  const onLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )
  const onFailure = () => (
    <div className="main-container">
      <Link to="/shelf">
        <button style={{width: 104}} type="button" className="find-book-mobile">
          Find Books
        </button>
      </Link>
      <div className="slider-container">
        <div className="find-book-row">
          <h1 className="rated">Top Rated Books</h1>
          <Link to="/shelf">
            <button type="button" className="find-book">
              Find Books
            </button>
          </Link>
        </div>
        <div className="failure-view-home-container">
          <img
            src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720725568/Group_7522_failureHome_pmjt6l.png"
            alt="failure view"
            className="failure-view-home"
          />
          <p className="failure-para-home">
            Something went wrong, Please try again.
          </p>
          <button type="button" className="try-again-button" onClick={onRetry}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )

  const onSuccess = () => (
    <div>
      <Link to="/shelf">
        <button style={{width: 104}} type="button" className="find-book-mobile">
          Find Books
        </button>
      </Link>
      <ul className="slider-container">
        <div className="find-book-row">
          <h1 className="rated">Top Rated Books</h1>
          <Link to="/shelf">
            <button type="button" className="find-book">
              Find Books
            </button>
          </Link>
        </div>
        <Slider {...settings}>
          {booksData.map(eachBook => (
            <TopRatedBooksList key={eachBook.id} books={eachBook} />
          ))}
        </Slider>
      </ul>
    </div>
  )

  const onRenderStatus = () => {
    switch (currentApiStatus) {
      case apiStatus.inProgress:
        return onLoading()
      case apiStatus.success:
        return onSuccess()
      case apiStatus.failure:
        return onFailure()
      default:
        return null
    }
  }
  useEffect(() => {
    onRender()
  }, [])
  return (
    <>
      <Header />
      <div className="main-container">
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-description">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        {onRenderStatus()}
        <div className="logos">
          <FaGoogle className="icons" />
          <FaTwitter className="icons" />
          <FaInstagram className="icons" />
          <FaYoutube className="icons" />
        </div>
        <p className="contact-us">Contact us</p>
      </div>
    </>
  )
}

export default Home
