import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json'; //just using toJSON to get the correct snapshots, here are the documentation: https://github.com/adriantoine/enzyme-to-json use this once
//import ReactShallowRenderer from 'react-test-renderer/shallow'; //react-test-renderer allows us to render our components with Javascript and we can assert what got rendered
import { Header } from '../../components/Header';

test('should render header correctly', ()=>{
    //when using enzyme:
    const wrapper = shallow(<Header startLogout={()=>{}}/>); //shallow takes in JSX that we are trying to render
    // expect(wrapper.find('h1').text()).toBe('Expensify'); // example on what enzyme can do (can test specific elements in a component)
    // expect(toJSON(wrapper)).toMatchSnapshot(); //create a snapshot base off of the enzyme wrapper need to use toJson() once thats why this line is commented out
    expect(wrapper).toMatchSnapshot();


    //when using 'react-test-renderer/shallow' 
    // const renderer = new ReactShallowRenderer(); // need to create a new renderer first
    // renderer.render(<Header />); // to render the JSX we are trying to render
    // expect(renderer.getRenderOutput()).toMatchSnapshot(); // snapshots allow us to track changes to data over time. If you want to make a change to the component the test will fail but you will need to press 'u' to accept the changes then the test will pass.
    // console.log(renderer.getRenderOutput()); // this would return the rendered output of the JSX we put in
});

test('should should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

