import React from "react";
import { shallow } from "enzyme";
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/test-expenses-data";

test('should render ExpenseListItem correctly', ()=>{
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />); //{...expenses[1]} this means we spread out one of the expenses. to add all of its properties as props for the component
    expect(wrapper).toMatchSnapshot();
});