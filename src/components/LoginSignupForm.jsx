import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userSignup, userLogin } from 'actions'


export class LoginSignupForm extends Component {
  state = { email: '', password: '' }

  ref = React.createRef()

  componentDidMount() {
    this.ref.current && this.ref.current.focus()
  }

  submit = e => {
    e.preventDefault()

    const { signup, dispatch } = this.props
    const { email, password } = e.target
    const action = signup ? userSignup : userLogin
    const data = {
      email: email.value.trim(),
      password: password.value.trim()
    }

    dispatch(action(data))
  }

  onChange = e => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  validEmail = email => {
    return [
      email.includes('@'), // Has the @ sybmol.
      email.includes('.'), // Has a period.
      !email.trim().includes(' '), // Doesn't contain spaces.
      email.length > 5, // At least 6 chars long => a@b.co

      // Ensure at least 2 characters in the `.com` portion (last segment of the email address).
      email.trim().split('').reverse().join('').split('.')[0].length > 1
    ].every(Boolean)
  }

  render() {
    const { signup, loginChecked, email } = this.props
    const eml = this.state.email
    const { password } = this.state

    // Not scoping this to just the signup form since these requirements would match the login too.
    const disabled = !this.validEmail(eml) || password.length < 8

    if (!loginChecked) return null
    if (email) return <Redirect push to="/" />

    return (
      <form className="login-form" onSubmit={this.submit}>
        { signup && <h1 className="tc">Create New Account</h1> }

        <input
          onChange={this.onChange}
          value={eml}
          name="email"
          type="text"
          placeholder="Email"
          ref={this.ref}
        />
        <input
          onChange={this.onChange}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
        />

        <button disabled={disabled} type="submit" >{signup ? 'Create Account' : 'Login'}</button>

        { !signup && <Link to="/signup">Sign up</Link> }
      </form>
    )
  }
}

LoginSignupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  loginChecked: PropTypes.bool,
  signup: PropTypes.bool
}

export default connect(({ user }) => user)(LoginSignupForm)
