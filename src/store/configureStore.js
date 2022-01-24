import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; //need to add applyMiddleware if you want to add middleware to the store like redux-thunk
import thunk from 'redux-thunk'; // // Thunk middleware for Redux. It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods becuase redux by itself only accepts objects not functions.
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose; //docs redux-devtools extention: https://github.com/zalmoxisus/redux-devtools-extension 

// Store Creation
export default ()=>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        
        composeEnhancers(applyMiddleware(thunk))
    );

    return store
};
// combineReducers function takes in an object with the key being what you want a reducer to work on and the value the reducer.
