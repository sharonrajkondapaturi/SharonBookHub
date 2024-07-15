import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errormsg, setErrormsg] = useState(false)
  const [msg, setmsg] = useState('')

  const onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const onFailure = errorMsg => {
    setErrormsg(true)
    setmsg(errorMsg)
  }

  const onRender = async event => {
    event.preventDefault()
    const loginApiUrl = ' https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      onSuccess(data.jwt_token)
    } else {
      onFailure(data.error_msg)
      setUsername('')
      setPassword('')
    }
  }

  const onUsername = event => {
    setUsername(event.target.value)
  }

  const onPassword = event => {
    setPassword(event.target.value)
  }

  return (
    <div className="container">
      <div>
        <img
          src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720528396/dbct7v0ewd4mjochbox2.png"
          className="image-container"
          alt="website login"
        />
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={onRender}>
          <img
            src="https://res.cloudinary.com/dmp4z05gw/image/upload/v1720529528/Group_7731_Logo_e5vjkk.png"
            alt="login website logo"
            className="website-logo"
          />
          <div className="credintial">
            <label htmlFor="username" className="login-label">
              Username*
            </label>
            <input
              placeholder="Username"
              id="username"
              className="login-input"
              value={username}
              onChange={onUsername}
            />
          </div>
          <div className="credintial">
            <label htmlFor="password" className="login-label">
              Password*
            </label>
            <input
              placeholder="Password"
              id="password"
              className="login-input"
              value={password}
              onChange={onPassword}
              type="password"
            />
          </div>

          {errormsg ? (
            <div className="error-container">
              <p className="errorMsg">{msg}</p>{' '}
            </div>
          ) : null}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
