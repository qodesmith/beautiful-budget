export const checkLogin = () => ({
  type: 'FETCH',
  url: '/api/is-logged-in',
  success: loginChecked , // Receives a user object.
  fail: loginChecked // Receives 'Not found' via a 404.
})

export const loginChecked = res => ({ type: 'LOGIN_CHECKED', user: res.email ? res : null })

export const logout = () => ({
  type: 'FETCH',
  url: '/api/logout',
  success: logoutSuccess,
  fail: logoutFail
})

export const logoutSuccess = () => ({ type: 'LOGOUT_SUCCESS' })
export const logoutFail = () => ({ type: 'LOGOUT_FAIL' })



const loginSignup = (payload, type) => ({
  type: 'FETCH',
  url: `/api/${type}`,
  method: 'POST',
  payload
})

export const userLogin = payload => loginSignup(payload, 'login')
export const userSignup = payload => loginSignup(payload, 'signup')

export const loginSuccess = user => ({ type: 'LOGIN_SUCCESS', user })
export const loginFail = () => ({ type: 'LOGIN_FAIL' })

export const signupSuccess = user => ({ type: 'SIGNUP_SUCCESS', user })
export const signupFail = error => ({ type: 'SIGNUP_FAIL', error })
