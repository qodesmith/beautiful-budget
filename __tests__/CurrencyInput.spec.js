import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CurrencyInput from 'components/CurrencyInput'


configure({ adapter: new Adapter() })

describe('CurrencyInput component', () => {
  it('should render an <input> element', () => {
    const component = renderer.create(<CurrencyInput />)
    const tree = component.toJSON()
    const input = shallow(<CurrencyInput />).find('input')

    expect(tree).toMatchSnapshot()
    expect(input.length).toBe(1)
  })

  it('should call props.onChange when input is changed', () => {
    const mockOnChange = jest.fn()
    const input = shallow(<CurrencyInput onChange={mockOnChange} />).find('input')

    input.simulate('change', { target: { value: '123' } })
    expect(mockOnChange).toHaveBeenCalledWith('123')

    input.simulate('change', { target: { value: '123.12345' } })
    expect(mockOnChange).toHaveBeenCalledWith('123.12')
  })

  it('should set the className properly, with & without props', () => {
    const wrapper1 = shallow(<CurrencyInput />)
    const wrapper2 = shallow(<CurrencyInput className='one two' />)
    const input1 = wrapper1.find('input')
    const input2 = wrapper2.find('input')

    expect(input1.hasClass('currency-input')).toBe(true)
    expect(input1.hasClass('one')).toBe(false)
    expect(input2.hasClass('currency-input')).toBe(true)
    expect(input2.hasClass('one')).toBe(true)
    expect(input2.hasClass('two')).toBe(true)
  })

  it('should truncate the cents value to 2 digits', () => {
    const wrapper = shallow(<CurrencyInput />)
    const input = wrapper.find('input')

    input.simulate('change', { target: { value: '123.45678' } })
    expect(wrapper.state().value).toBe('123.45')
  })

  it('should append a 0 when pasting in a decimal-only number', () => {
    const wrapper = mount(<CurrencyInput />)
    wrapper.find('input').simulate('change', { target: { value: '.25' } })
    expect(wrapper.state().value).toBe('0.25')
  })

  it('should not change value when simply typing a `.`', () => {
    const wrapper = mount(<CurrencyInput />)
    const input = wrapper.find('input')

    input.simulate('change', { target: { value: '.' } })
    expect(wrapper.state().value).toBe('')

    input.simulate('change', { target: { value: '0.' } })
    expect(wrapper.state().value).toBe('0.')
  })

  it('should not have any value when pasting in an invalid value', () => {
    const wrapper = mount(<CurrencyInput />)
    const input = wrapper.find('input')

    input.simulate('change', { target: { value: 'f123' } })
    expect(wrapper.state().value).toBe('')

    input.simulate('change', { target: { value: 'f.25' } })
    expect(wrapper.state().value).toBe('')

    input.simulate('change', { target: { value: 'f0.25' } })
    expect(wrapper.state().value).toBe('')

    input.simulate('change', { target: { value: 'JavaScript Rules' } })
    expect(wrapper.state().value).toBe('')
  })

  it('should not change current value when pasting in an invalid value', () => {
    const wrapper = mount(<CurrencyInput />)
    const input = wrapper.find('input')
    const initialVal = '123.45'

    // Get an initial valid value going.
    input.simulate('change', { target: { value: initialVal } })

    input.simulate('change', { target: { value: 'f123' } })
    expect(wrapper.state().value).toBe(initialVal)

    input.simulate('change', { target: { value: 'f.25' } })
    expect(wrapper.state().value).toBe(initialVal)

    input.simulate('change', { target: { value: 'f0.25' } })
    expect(wrapper.state().value).toBe(initialVal)

    input.simulate('change', { target: { value: 'JavaScript Rules' } })
    expect(wrapper.state().value).toBe(initialVal)
  })
})
