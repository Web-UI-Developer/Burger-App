import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

configure ({ adapter: new Adapter()})
describe('<NavigationItems/>', () => {
  let wrapper;

  beforeEach (() => {
    wrapper = shallow(<NavigationItems />)
  });

  it('should render two nav items elements if it is not authorized', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three nav items elements if it is authorized', () => {
    wrapper.setProps({isAuthenticated:true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render logout if it is authorized', () => {
    wrapper.setProps({isAuthenticated:true});
    expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
  })
})