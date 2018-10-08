const initialState = {
  loginChecked: false
}

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOGIN_CHECKED':
      return { ...state, ...action.user, loginChecked: true }
    case 'LOGOUT_SUCCESS':
      return { loginChecked: true }
    default:
      return state
  }
}

export default userReducer
