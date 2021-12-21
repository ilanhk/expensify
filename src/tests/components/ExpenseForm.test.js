import React from "react";
import { SingleDatePicker } from 'react-dates';
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from '../fixtures/test-expenses-data';




test('should render ExpenseForm correctly', ()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with an expense data', ()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', ()=>{
    const wrapper = shallow(<ExpenseForm  />);
    expect(wrapper).toMatchSnapshot(); // snapshot before error
    wrapper.find('form').simulate('submit', {
        preventDefault: ()=>{} // need to submit something eventhough it equals nothing to prevent undefined error for preventDefault.
    }); // need to simulate form being submitted docs: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html
    
    expect(wrapper.state('error').length).toBeGreaterThan(0); // get length of error field and see if > 0. docs: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/state.html
    expect(wrapper).toMatchSnapshot(); // make sure if error state changes it will get rendered
});

test('should set description on input change', ()=>{
    const value = 'new description';
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    }); // if look for input there are many it will call .at(0) means the first one.
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', ()=>{
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});



test('should set amount if valid input', ()=>{
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});



test('should not set amount if invalid input', ()=>{
    const value = '12.222';
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(''); //should be the default value which is nothing because the input was invalid. So didnt pass.
});

//spies - fake functions created by jest so we can make assertions on them. ex to see if function was called? how many times was it called? ...
test('should call onSubmit prop for valid form submission', ()=>{
    const onSubmitSpy = jest.fn(); //to create a new spy, function we call with no arguments to return a new spy
    // onSubmitSpy('Ilan', 'Hong Kong');
    // // expect(onSubmitSpy).toHaveBeenCalled(); // it will throw error if never called but would pass if called. docs in jest expect: https://jestjs.io/docs/expect
    // expect(onSubmitSpy).toHaveBeenCalledWith('Ilan', 'Hong Kong');
    const wrapper =  shallow(<ExpenseForm  expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: ()=>{} 
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', ()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', ()=>{
    const focused = true;
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarfocused')).toBe(focused);
});