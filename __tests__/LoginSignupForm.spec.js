import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { LoginSignupForm } from 'components/LoginSignupForm'


configure({ adapter: new Adapter() })

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}))

describe('LoginSignupForm component', () => {
  it('should render the login form correctly', () => {
    const component = renderer.create(<LoginSignupForm loginChecked />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render the signup form correctly', () => {
    const component = renderer.create(<LoginSignupForm loginChecked signup />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render null when loginChecked is false', () => {
    const wrapper = mount(<LoginSignupForm loginChecked={false} />)
    expect(wrapper.html()).toBe(null)
  })

  it('should render the login form correctly', () => {
    const wrapper = mount(<LoginSignupForm loginChecked />)

    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('h1').length).toBe(0)
    expect(wrapper.find('input').length).toBe(2)
    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.find('button').text()).toBe('Login')
    expect(wrapper.find('a').length).toBe(1)
    expect(wrapper.find('a').text()).toBe('Sign up')
    expect(wrapper.find('a').props().href).toBe('/signup')
  })

  it('should render the signup form correctly', () => {
    const wrapper = mount(<LoginSignupForm loginChecked signup />)

    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('h1').length).toBe(1)
    expect(wrapper.find('h1').text()).toBe('Create New Account')
    expect(wrapper.find('input').length).toBe(2)
    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.find('button').text()).toBe('Create Account')
    expect(wrapper.find('a').length).toBe(0)
  })

  it('should disable submission for any combo of a bad email or pw < 8 characters', () => {
    const login = mount(<LoginSignupForm loginChecked />)
    const signup = mount(<LoginSignupForm loginChecked signup />)

    expect(login.find('button').props().disabled).toBe(true)
    expect(signup.find('button').props().disabled).toBe(true)

    login.setState({ email: 'yomama@sofat.com' })
    signup.setState({ email: 'yomama@sofat.com' })
    expect(login.find('button').props().disabled).toBe(true)
    expect(signup.find('button').props().disabled).toBe(true)

    login.setState({ password: '12345678' })
    signup.setState({ password: '12345678' })
    expect(login.find('button').props().disabled).toBe(false)
    expect(signup.find('button').props().disabled).toBe(false)

    login.setState({ password: '1234567' })
    signup.setState({ password: '1234567' })
    expect(login.find('button').props().disabled).toBe(true)
    expect(signup.find('button').props().disabled).toBe(true)

    login.setState({ email: 'yomama@sofat.', password: '12345678' })
    expect(login.find('button').props().disabled).toBe(true)
    expect(signup.find('button').props().disabled).toBe(true)
  })
})
