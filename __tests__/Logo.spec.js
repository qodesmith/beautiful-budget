import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Logo from 'components/Logo'

configure({ adapter: new Adapter() })

describe('Logo component', () => {
  const wrapper1 = shallow(<Logo />)

  it('should render correctly', () => {
    const component = renderer.create(<Logo />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
    expect(wrapper1.find('svg').length).toBe(1)
  })

  it('should apply class names correctly', () => {
    const wrapper2 = shallow(<Logo className="one two" />)

    expect(wrapper1.hasClass('logo')).toBe(true)
    expect(wrapper1.hasClass('one')).toBe(false)
    expect(wrapper1.hasClass('two')).toBe(false)

    expect(wrapper2.hasClass('logo')).toBe(true)
    expect(wrapper2.hasClass('one')).toBe(true)
    expect(wrapper2.hasClass('two')).toBe(true)
  })

  it('should set inline styles for width & height on the svg', () => {
    const wrapper2 = shallow(<Logo size={150} />)
    const svgProps1 = wrapper1.find('svg').props()
    const svgProps2 = wrapper2.find('svg').props()

    expect(svgProps1.width).toBe('60px')
    expect(svgProps1.height).toBe('60px')
    expect(svgProps2.width).toBe('150px')
    expect(svgProps2.height).toBe('150px')
  })

  it('apply other props passed down to the containing div', () => {
    const mockFxn = jest.fn()
    const wrapper2 = shallow(<Logo onClick={mockFxn} title="test title" />)

    wrapper2.simulate('click')

    expect(mockFxn).toHaveBeenCalled()
    expect(wrapper2.find('[title="test title"]').length).toBe(1)
  })
})
