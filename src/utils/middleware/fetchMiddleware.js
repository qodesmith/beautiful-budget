const fetchApi = store => next => action => {
  next(action) // Actions get passed through by default
  if (action.type !== 'FETCH') return

  const { dispatch } = store
  const { url, method = 'GET', payload, start, success, fail } = action
  const options = {
    method,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: payload ? JSON.stringify(payload) : null
  }

  start && dispatch(start())

  fetch(url, options)
    .then(res => {
      const contentType = res.headers.get('content-type')
      if (!res.ok) throw res.statusText

      /*
        The server will responsd with index.html for 404's, which is not JSON.
        Checking the content-type tells us whether our request was found or not.
      */
      if (!contentType.includes('application/json')) throw 'Not found.'
      return res.json()
    })
    .then(res => success && dispatch(success(res)))
    .catch(err => fail && dispatch(fail(err)))
}

export default fetchApi
