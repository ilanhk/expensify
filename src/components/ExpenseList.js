import React from "react";
import { connect } from "react-redux"; //connects the component to the redux store
import expenses from "../reducers/expenses";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses"

export const ExpenseList = (props)=> (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense)=>{
                    return <ExpenseListItem key={expense.id} {...expense}/>
                })
            )
        }
        
    </div>
); 

const mapStateToProps = (state)=>{
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};
// function that maps the store state to component props
// its convention to make this function with that name

export default connect(mapStateToProps)(ExpenseList);
// the function as a connect argument definese the properties we want to get from the store
