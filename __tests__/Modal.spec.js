import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Modal from 'components/Modal'

configure({ adapter: new Adapter() })

// Issues with Enzyme & testing React Portals - https://goo.gl/aGTmmh

describe('Modal component', () => {
  const mockFxn = jest.fn()
  const wrapper1 = mount(
    <Modal time={100}>
      <div className="test-content">content</div>
    </Modal>
  )
  const wrapper2 = mount(
    <Modal onClose={mockFxn} className="one two" time={275}>
      <div className="test-content">content</div>
    </Modal>
  )

  it('should render correctly', () => {
    const modal1 = wrapper1.find('.modal')
    const modal2 = wrapper2.find('.modal')
    const content1 = wrapper1.find('.modal-content')
    const content2 = wrapper2.find('.modal-content')
    const test1 = wrapper1.find('.test-content')
    const test2 = wrapper2.find('.test-content')

    expect(modal1.length).toBe(1)
    expect(modal2.length).toBe(1)
    expect(content1.length).toBe(1)
    expect(content2.length).toBe(1)
    expect(test1.length).toBe(1)
    expect(test2.length).toBe(1)
    expect(test1.text()).toBe('content')
    expect(test2.text()).toBe('content')
  })

  it('should render the close button only when `onClose` is provided', () => {
    expect(wrapper1.find('.close').length).toBe(0)
    expect(wrapper2.find('.close').length).toBe(1)
  })

  it('should run the provided `onClose` function when the close button is clicked', done => {
    /*** The onClose function runs AFTER the `time` prop has passed. ***/

    const close = wrapper2.find('.close')

    // Allow the modal to appear before clicking.
    setTimeout(() => {
      close.simulate('click')

      // Make assertions after the modal has disappeared.
      setTimeout(() => {
        expect(mockFxn.mock.calls.length).toBe(1)
        expect(mockFxn).toHaveBeenCalled()
        expect(mockFxn).toHaveBeenCalledTimes(1)
        done()
      }, 300)
    }, 300)
  })

  it('should apply class names correctly', () => {
    const modal1 = wrapper1.find('.modal')
    const modal2 = wrapper2.find('.modal')

    expect(modal1.hasClass('one')).toBe(false)
    expect(modal1.hasClass('two')).toBe(false)
    expect(modal2.hasClass('one')).toBe(true)
    expect(modal2.hasClass('two')).toBe(true)
  })

  it('should apply a transition inline style correctly based on the time prop', () => {
    const props1 = wrapper1.find('.modal').props()
    const props2 = wrapper2.find('.modal').props()

    expect(props1.style.transition).toBe('opacity 0.1s')
    expect(props2.style.transition).toBe('opacity 0.275s')
  })
})
