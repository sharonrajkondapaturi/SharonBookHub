import {Link, withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'

const Header = props => {
  const [tab, setTab] = useState('')
  const [ham, setHam] = useState(false)
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onColor = () => {
    const {history} = props
    const {location} = history
    const {pathname} = location
    if (pathname === '/') {
      setTab('Home')
    } else {
      setTab('Bookshelves')
    }
  }
  const onHam = () => {
    setHam(prevState => !prevState)
  }

  useEffect(() => {
    onColor()
    // eslint-disable-next-line
  }, [tab])

  return (
    <div>
      <nav className='nav-container'>
        <Link to='/' style={{textDecoration: 'none'}}>
          <img
            src='https://res.cloudinary.com/dmp4z05gw/image/upload/v1720529528/Group_7731_Logo_e5vjkk.png'
            alt='website logo'
            className='header-website-logo'
            onClick={onColor}
          />
        </Link>
        <button type='button' className='hamburger-button'>
          <img
            src='https://res.cloudinary.com/dmp4z05gw/image/upload/v1720625153/icon_hamburger_wdmfws.png'
            alt='hamburger'
            className='hamburger-icon'
            onClick={onHam}
          />
        </button>
        <div className='link-row'>
          <Link to='/' style={{textDecoration: 'none', marginRight: 20}}>
            <p className={tab === 'Home' ? 'links' : 'no-links'}>Home</p>
          </Link>
          <Link to='/shelf' style={{textDecoration: 'none', marginRight: 20}}>
            <p
              className={tab === 'Bookshelves' ? 'links' : 'no-links'}
              onClick={onColor}
            >
              Bookshelves
            </p>
          </Link>
          <button className='logout-button' type='button' onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
      {ham ? (
        <div className='link-mobiles'>
          <div className='link-row-mobile'>
            <Link to='/' style={{textDecoration: 'none', marginRight: 20}}>
              <p className={tab === 'Home' ? 'links' : 'no-links'} value='Home'>
                Home
              </p>
            </Link>
            <Link to='/shelf' style={{textDecoration: 'none', marginRight: 20}}>
              <p
                className={tab === 'Bookshelves' ? 'links' : 'no-links'}
                onClick={onColor}
                value='Bookshelves'
                style={{marginLeft: 20}}
              >
                Bookshelves
              </p>
            </Link>
            <button className='logout-button' type='button' onClick={onLogout}>
              Logout
            </button>
            <button type='button' className='close-button' onClick={onHam}>
              <IoMdCloseCircle size={25} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default withRouter(Header)
