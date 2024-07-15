import {useState, useEffect} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {IoSearchSharp} from 'react-icons/io5'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import BookList from '../BookList'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Bookshelves = () => {
  const [currentApiStatus, setApiStatus] = useState(apiStatus.initial)
  const [shelf, setShelf] = useState(bookshelvesList[0].value)
  const [tempSearch, setTempSearch] = useState('')
  const [search, setSearch] = useState('')
  const [shelfLabel, setLabel] = useState(bookshelvesList[0].label)
  const [bookData, setBooks] = useState([])

  const onRender = async () => {
    setApiStatus(apiStatus.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const booksApiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(booksApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const bookDetails = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
      }))
      setBooks(bookDetails)
      setApiStatus(apiStatus.success)
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
    <div className="failure-view-shelf-container">
      <img
        src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720725568/Group_7522_failureHome_pmjt6l.png"
        alt="failure view"
        className="failure-view-shelf"
      />
      <p className="failure-para-shelf">
        Something went wrong, Please try again.
      </p>
      <button type="button" className="try-again-button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
  const onSuccess = () => (
    <>
      {bookData.length !== 0 ? (
        <ul className="unlist-books">
          {bookData.map(eachBook => (
            <BookList key={eachBook.id} books={eachBook} />
          ))}
        </ul>
      ) : (
        <div>
          <img
            src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720724500/Asset_1_1_noBooks_ljr4qh.png"
            alt="no books"
            className="no-search-image"
          />
          <p>Your search for {search} did not find any matches.</p>
        </div>
      )}
    </>
  )

  const onShelf = event => {
    const newShelf = event.target.value
    setShelf(newShelf)
    if (newShelf === bookshelvesList[0].value) {
      setLabel(bookshelvesList[0].label)
    } else if (newShelf === bookshelvesList[1].value) {
      setLabel(bookshelvesList[1].label)
    } else if (newShelf === bookshelvesList[2].value) {
      setLabel(bookshelvesList[2].label)
    } else {
      setLabel(bookshelvesList[3].label)
    }
  }
  const onTempSearch = event => {
    const newTempSearch = event.target.value
    setTempSearch(newTempSearch)
  }
  const onSearch = () => {
    setSearch(tempSearch)
  }

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
  const onTabs = () => (
    <div className="main-container-1">
      <div className="side-bar">
        <div className="search-container-mobile">
          <input
            placeholder="search"
            className="search-input"
            value={tempSearch}
            onChange={onTempSearch}
          />
          <button
            testid="searchButtonMobiles"
            type="button"
            className="search-button"
            onClick={onSearch}
          >
            <IoSearchSharp />
          </button>
        </div>
        <div>
          <h1 className="bookshelves-heading">Bookshelves</h1>
        </div>
        <ul className="unlist-books-category">
          <li className="list-books">
            <button
              data-testid="searchButton"
              type="button"
              onClick={onShelf}
              value={bookshelvesList[0].value}
              className={
                bookshelvesList[0].value === shelf ? 'color-shelf' : 'shelf'
              }
            >
              {bookshelvesList[0].label}
            </button>
          </li>
          <li className="list-books">
            <button
              data-testid="searchButton"
              type="button"
              onClick={onShelf}
              value={bookshelvesList[1].value}
              className={
                bookshelvesList[1].value === shelf ? 'color-shelf' : 'shelf'
              }
            >
              {bookshelvesList[1].label}
            </button>
          </li>
          <li className="list-books">
            <button
              data-testid="searchButton"
              type="button"
              onClick={onShelf}
              value={bookshelvesList[2].value}
              className={
                bookshelvesList[2].value === shelf ? 'color-shelf' : 'shelf'
              }
            >
              {bookshelvesList[2].label}
            </button>
          </li>
          <li className="list-books">
            <button
              data-testid="searchButton"
              type="button"
              onClick={onShelf}
              value={bookshelvesList[3].value}
              className={
                bookshelvesList[3].value === shelf ? 'color-shelf' : 'shelf'
              }
            >
              {bookshelvesList[3].label}
            </button>
          </li>
        </ul>
      </div>
      <div className="main-container-2">
        <div className="lower-container">
          <h1 className="all-books">{shelfLabel} Books</h1>
          <div className="search-container">
            <input
              type="search"
              placeholder="search"
              className="search-input"
              value={tempSearch}
              onChange={onTempSearch}
            />
            <button
              testid="searchButton"
              type="button"
              className="search-button"
              onClick={onSearch}
            >
              <BsSearch />
            </button>
          </div>
        </div>
        {onRenderStatus()}
        <div className="logos-books">
          <FaGoogle className="icons" />
          <FaTwitter className="icons" />
          <FaInstagram className="icons" />
          <FaYoutube className="icons" />
        </div>
        <p className="contact-us">Contact us</p>
      </div>
    </div>
  )

  useEffect(() => {
    onRender()
    // eslint-disable-next-line
  }, [shelf, search])

  return (
    <div>
      <Header />
      <div>{onTabs()}</div>
    </div>
  )
}

export default Bookshelves
