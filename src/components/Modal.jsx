import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { cn } from 'helpers'
import Close from 'components/Close'


const Modal = ({ onClose, className, children }) => {
  const cls = cn('modal', { [className]: className })

  return createPortal(
    <div className={cls}>
      { onClose && <Close onClick={onClose} /> }
      <div className="modal-content">
        { children }
      </div>
    </div>,
    document.body
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Modal
