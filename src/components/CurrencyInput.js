import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cn } from 'helpers'


class CurrencyInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func
  }

  state = { value: '' }

  truncateCents = val => {
    const [ dollars, cents ] = val.split('.')

    if (cents === undefined) return val

    return `${dollars}.${cents.slice(0, 2)}`
  }

  onChange = e => {
    const value = e.target.value.trim()
    const empty = value === ''
    const newValue = empty ? '' : this.truncateCents(value)
    const noChange = newValue === this.state.value

    // Any value other than '' must be a valid parsable number.
    // Also, prevent re-renders when the value hasn't changed.
    if ((!empty && isNaN(+value)) || noChange) return

    // The empty string allows the field to be cleared.
    this.setState({ value: newValue }, () => {

      // Fire an onChange hook if provided.
      this.props.onChange && this.props.onChange(newValue)
    })
  }

  render() {
    const { className } = this.props
    const cls = cn('currency-input', { [className]: className })

    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.onChange}
        className={cls}
      />
    )
  }
}

export default CurrencyInput
