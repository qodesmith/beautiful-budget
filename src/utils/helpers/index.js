// https://goo.gl/MrXVRS - micro UUID!
export const uuid = a=>a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)

export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const letters = 'abcdef'
const numbers = '0123456789'
export const randomHexColor = () => (
  letters.split('').reduce(hex => {
    const set = randomNum(0, 1) ? letters : numbers
    const num = randomNum(0, set.length - 1)
    return `${hex}${set[num]}`
  }, '#')
)

export const cn = (...args) => {
  const classNames = args.reduce((arr, thing) => {
    if (typeof thing === 'string') return [...arr, thing] // Strings.
    if (({}).toString.call(thing) !== '[object Object]') return arr // Ignore everything else but objects.

    const subArr = Object
      .keys(thing)
      .reduce((arr2, key) => (thing[key] ? [...arr2, key] : arr2), [])

    return [...arr, ...subArr]
  }, [])

  // Avoid duplicate names.
  return [...new Set(classNames)].join(' ')
}
