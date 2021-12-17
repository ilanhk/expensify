import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../components/ExpenseList"; //we want the unconnected version of this component the default export is the connected version of it.
import expenses from "../fixtures/test-expenses-data";

test('should render ExpenseList with expenses', ()=>{
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', ()=>{
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});