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

// Import our components.
import SideBar from 'components/SideBar'
import Content from 'components/Content'

// Import a store, created & ready to go.
import store from './store'


// Create a single element for our app to live.
document.body.innerHTML = '<div id="app"></div>'

ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <SideBar />
      <Content />
    </Fragment>
  </Provider>,
  document.querySelector('#app')
)
