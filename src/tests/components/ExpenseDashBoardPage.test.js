import React from "react";
import { shallow } from "enzyme";
import ExpenseDashBoardPage from "../../components/ExpenseDashBoardPage";


test('should render ExpenseDashBoardPage correctly', ()=>{
    const wrapper = shallow(<ExpenseDashBoardPage />);
    expect(wrapper).toMatchSnapshot();
});