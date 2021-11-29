import { createStore, combineReducers } from 'redux'; 
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// Store Creation
export default ()=>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        // this line is for redux-devtools extention: https://github.com/zalmoxisus/redux-devtools-extension 
    );

    return store
};
// combineReducers function takes in an object with the key being what you want a reducer to work on and the value the reducer.
