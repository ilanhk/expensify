import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense)=>{
        //props.dispatch(addExpense(expense));
        this.props.startAddExpense(expense); // much easier to test than the commented out line above
        this.props.history.push('/'); // to redirect the user to dashboard page after clicking submit
    };
    render(){
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    };
};


const mapDispatchToProps = (dispatch)=>({
    startAddExpense: (expense)=> dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
// sometimes dont need to have mapStateToProps you can leave connect with no arguments