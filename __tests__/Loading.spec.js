import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Loading from 'components/Loading'

configure({ adapter: new Adapter() })

describe('Loading component', () => {
  const wrapper1 = shallow(<Loading />)

  it('should render correctly', () => {
    const component = renderer.create(<Loading />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
    expect(wrapper1.find('svg').length).toBe(1)
  })

  it('should apply class names correctly', () => {
    const wrapper2 = shallow(<Loading className="one two" />)

    expect(wrapper1.hasClass('one')).toBe(false)
    expect(wrapper1.hasClass('two')).toBe(false)
    expect(wrapper2.hasClass('one')).toBe(true)
    expect(wrapper2.hasClass('two')).toBe(true)
  })

  it('should set the fill property on the svg', () => {
    const wrapper2 = shallow(<Loading color="#ABC" />)

    expect(wrapper1.find('svg').props().fill).toBe('#fff')
    expect(wrapper2.find('svg').props().fill).toBe('#ABC')
  })

  it('should render a div with text via the text prop', () => {
    const wrapper = shallow(<Loading text="react is awesome" />)

    expect(wrapper.text()).toBe('react is awesome')
    expect(wrapper.find('div').length).toBe(2)
    expect(wrapper1.find('div').length).toBe(1)
  })

  it('should apply any other props passed in to the containing div', () => {
    const fxn = () => {}
    const wrapper = shallow(<Loading onClick={fxn} style={{ color: 'blue' }} />)
    const props = wrapper.find('div').props()

    expect(props.onClick).toBe(fxn)
    expect(props.style.color).toBe('blue')
  })
})
