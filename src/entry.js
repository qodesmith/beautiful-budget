// You may or may not need this depending on
// what JavaScript features you're using - e.x. async / await.
// Feel free to remove it and see what happens!
import '@babel/polyfill'

// Import our top-level sass file.
import './styles/styles.scss'

// Import React.
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

// Import our store provider.
import { Provider } from 'react-redux'

// Import React Router stuff.
import { BrowserRouter, Route } from 'react-router-dom'

// Import our components.
import App from 'components/App'
import LoginSignupForm from 'components/LoginSignupForm'

// Import a store, created & ready to go.
import store from './store'


// Create a single element for our app to live.
document.body.innerHTML = '<div id="app"></div>'

// Mount our react application.
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route path="/login" render={() => <LoginSignupForm />} />
        <Route path="/signup" render={() => <LoginSignupForm signup />} />
        <Route path="/" component={App} />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
)
