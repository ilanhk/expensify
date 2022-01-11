import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';


export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
   
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    );
};

const mapStateToProps = (state) =>{
    const visableExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visableExpenses.length,
        expensesTotal: selectExpensesTotal(visableExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);

