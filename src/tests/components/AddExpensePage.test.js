import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/test-expenses-data';

//instead of using the same code in each test cases we will use globals docs: https://jestjs.io/docs/api 
let addExpense, history, wrapper;

beforeEach(()=>{
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
}); //runs a function before each of the tests in the file runs.

test('should render AddExpensePage correctly', ()=>{
    // const onSubmit = jest.fn();
    // const history = { push: jest.fn() };
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', ()=>{
    // const onSubmit = jest.fn();
    // const history = { push: jest.fn() };
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});

