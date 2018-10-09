import React from 'react'
import PropTypes from 'prop-types'
import { cn } from 'helpers'


const Close = ({ className, color = '#000', size = 30, onClick }) => {
  const cls = cn('close', { [className]: className })
  const sizePxl = `${size}px`

  return (
    <div style={{ width: sizePxl, height: sizePxl }} className={cls} onClick={onClick}>
      <svg viewBox="0 0 47.971 47.971" fill={color}>
        <g>
          <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
          c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
          C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
          s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
        </g>
      </svg>
    </div>
  )
}

Close.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

export default Close
