import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Accounts from 'components/svg/Accounts'
import Budget from 'components/svg/Budget'
import PlusCircle from 'components/svg/PlusCircle'
import Settings from 'components/svg/Settings'
import Question from 'components/svg/Question'


configure({ adapter: new Adapter() })

describe('Svg components', () => {
  [Accounts, Budget, PlusCircle, Settings, Question].forEach(Component => {
    /*
      This nonsense is simply to get the components name so
      we can print it to the console while testing.
    */
    const Parent = () => <Component />
    const temp = shallow(<Parent />)
    const name = temp.name()
    const wrapper = shallow(<Component />)

    it(`${name} - should render correctly`, () => {
      expect(wrapper.name()).toBe('svg')
    })

    it(`${name} - should set inline styles for width & height on the svg`, () => {
      const wrapper2 = shallow(<Component size={50} />)

      expect(wrapper.props().width).toBe('25px')
      expect(wrapper.props().height).toBe('25px')
      expect(wrapper2.props().width).toBe('50px')
      expect(wrapper2.props().height).toBe('50px')
    })
  })

  it('Question - should render a circle based on the circle prop', () => {
    const wrapper1 = shallow(<Question />)
    const wrapper2 = shallow(<Question circle />)

    expect(wrapper1.find('path').length).toBe(2)
    expect(wrapper2.find('path').length).toBe(3)
  })
})
