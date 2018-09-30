import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Close from 'components/Close'

configure({ adapter: new Adapter() })

describe('Close component', () => {
  const mockFxn = jest.fn()
  const wrapper1 = shallow(<Close onClick={mockFxn} />)
  const wrapper2 = shallow(<Close onClick={mockFxn} className='one two' color='#fff' size={50} />)

  it('should render correctly', () => {
    const component = renderer.create(<Close onClick={() => {}} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should apply class names correctly', () => {
    expect(wrapper1.hasClass('close')).toBe(true)
    expect(wrapper1.hasClass('one')).toBe(false)
    expect(wrapper1.hasClass('two')).toBe(false)

    expect(wrapper2.hasClass('close')).toBe(true)
    expect(wrapper2.hasClass('one')).toBe(true)
    expect(wrapper2.hasClass('two')).toBe(true)
  })

  it('should apply the fill property to the svg correctly', () => {
    expect(wrapper1.find('svg').prop('fill')).toBe('#000')
    expect(wrapper2.find('svg').prop('fill')).toBe('#fff')
  })

  it('should set inline styles for width & height', () => {
    expect(wrapper1.prop('style').width).toBe('30px')
    expect(wrapper1.prop('style').height).toBe('30px')
    expect(wrapper2.prop('style').width).toBe('50px')
    expect(wrapper2.prop('style').height).toBe('50px')
  })


  it('should run the onClick function when clicked', () => {
    wrapper1.simulate('click')

    expect(mockFxn.mock.calls.length).toBe(1)
    expect(mockFxn).toHaveBeenCalled()
    expect(mockFxn).toHaveBeenCalledTimes(1)
  })
})
