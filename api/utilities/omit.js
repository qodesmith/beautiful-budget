function omit(obj, omittedKeys) {
  if (typeof omittedKeys === 'string') omittedKeys = [omittedKeys]

  return Object
    .keys(obj)
    .reduce((acc, key) => {
      if (!omittedKeys.includes(key)) acc[key] = obj[key]
      return acc
    }, {})
}

module.exports = omit
