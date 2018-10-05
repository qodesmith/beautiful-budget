import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { cn } from 'helpers'
import Close from 'components/Close'


class Modal extends Component {
  state = {
    // Choices - 'hidden', 'revealing', 'showing', 'hiding'
    transition: 'hidden'
  }

  componentDidMount() {
    // Timer to apply the 'show' class.
    this.revealing = setTimeout(() => {

      // Will cause the 'show' class to be applied.
      this.setState({ transition: 'revealing' }, () => {

        // Time to enable toe `onClose` function.
        this.isShowing = setTimeout(() => {

          // After the intial reveal, enable the `onClose` function.
          this.setState({ transition: 'showing' })
        }, this.props.time) // This value corresponds to the css transition time.
      })
    }, 10)
  }

  componentWillUnmount() {
    clearTimeout(this.revealing)
    clearTimeout(this.isShowing)
    clearTimeout(this.closing)
  }

  onClose = e => {
    const { transition } = this.state


    if (transition !== 'showing' || this.onCloseRan) return
    this.onCloseRan = true

    this.setState({ transition: 'hiding' }, () => {
      this.closing = setTimeout(() => {
        this.props.onClose(e)
      }, this.props.time)
    })
  }

  render() {
    const { className, children, onClose, time } = this.props
    const { transition } = this.state
    const second = time / 1000
    const cls = cn('modal', {
      [className]: className,
      show: transition === 'revealing' || transition === 'showing'
    })

    return createPortal(
      <div className={cls} style={{ transition: `opacity ${second}s`}}>
        { !!onClose && <Close onClick={this.onClose} /> }
        <div className="modal-content">
          { children }
        </div>
      </div>,
      document.body
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClose: PropTypes.func,
  time: PropTypes.number.isRequired
}

export default Modal
