import { createStore, combineReducers } from 'redux'; 
//combineReducers - would allow us to make multiple functions that define how our redux applications changes. (Create multiple functions and combine them together)
import { v4 as uuidv4 } from 'uuid';; // to generate random ids

// ADD_EXPENSE
const addExpense = (
    { 
        description = '',
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
)=>({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {})=>({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '')=>({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = ()=>({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate)=>({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate)=>({
    type: 'SET_END_DATE',
    endDate
});

// Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action)=>{
    switch (action.type){
        case 'ADD_EXPENSE':
            return [
                ...state, // current state (current items in the array)
                action.expense // new item to add on to the array
            ]

        case 'REMOVE_EXPENSE':
            return state.filter(({ id })=>id !== action.id); // if item returns false the item would be removed

        case 'EDIT_EXPENSE': 
          return state.map((expense)=>{
            if (expense.id === action.id){
                return {
                    ...expense,
                    ...action.updates
                }
            } else {
                return expense;
            }
          });  
        default:
            return state;
    }
};
//state.concat(action.expense); //it will combine state to the new array (without changing state) and returning it.
// [ ...state, action.expense] this means that it will create a new array of adding state array with action.expense this is called 'Spread Operator'


// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action)=>{
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            } 
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate

            } 
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
                    
            }           
        default:
            return state;
    }
};


//Get Visible Expenses

//TimeStamps (only + or - integer values) (counting in miliseconds)
// positive numbers go foward in time negative goes backwards
// timestamp start date is 01/01/1970 (unix epoch)

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; // if typeof startDate !== 'number' is false then it would run the other code next to ||
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); // includes means if the array has that item.

        return startDateMatch && endDateMatch && textMatch;
        //if all of these are true item will be kept in array 
        //if any of these are false the whole thing will result in false because using '&&' which would result in the item being removed from the array.
    }).sort((a, b)=>{
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount'){
            return a.amount < b.amount? 1 : -1
        }
        // if a.createdAt < b.createdAt is true b comes first if not a comes first because we want to most recent expense
        // documentation for .sort() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
    });
};


// Store Creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);
// combineReducers function takes in an object with the key being what you want a reducer to work on and the value the reducer.

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense( expenseTwo.expense.id, { amount: 500 })); // 1st argument is the expense id and the 2nd argument is the updater object on what we want to edit

// store.dispatch(setTextFilter('ffe'));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));



const demoState = {
    expenses: [{
        id: 'dsfgadfgh',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // sort by date or amount
        startDate: undefined,
        endDate: undefined
    }
}; // dummy data


// Spreading Objects Operator
// const user = {
//     name: 'Ilan',
//     age: 28
// };

// console.log({
//     ...user, // an object to add to the new object
//     location: 'Hong Kong SAR', // add new properties
//     age: 100 // can overide the user object's properties ex changing the age of the user. This works if its after the object you want to change (user). If write this property before the user object age will overide this age.

// });


