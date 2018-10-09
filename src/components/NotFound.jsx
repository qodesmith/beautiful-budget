import React, { Fragment } from 'react'


const NotFound = () => (
  <Fragment>
    <h2>Oops...</h2>
    <p>Doesn't look like {window.location.href} is a thing</p>
  </Fragment>
)

export default NotFound
