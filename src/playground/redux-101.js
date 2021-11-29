// redux documentation: https://redux.js.org/
import { createStore } from 'redux'; 

//Action Generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {})=>({
        type: 'INCREMENT_COUNT',
        incrementBy
    });
    // { incrementBy = 1 } is a destructured so we can use incrementBy in the function and if incrementBy doesnt exist use 1 (default).
    // typeof incrementBy === 'number' ? incrementBy : 1 // if incrementBy is a number use it if not use the default value 1.
    // { incrementBy = 1 } = {} if object provided but nothing in it it will equal 1 if no object provided it will equal an empty object.

const decrementCount = ({decrementBy = 1} = {} )=>({
    type: 'DECREMENT',
    decrementBy
});

//setCount
const setCount = ({ count } = {} )=>({
    type: 'SET',
    count
});

//resetCount
const resetCount = ()=>({
    type: 'RESET'
});


//Reducers - reducer decides what to do base on the action on how we want to change the state
// real world apps would have multiple reducers good to keep it in this format.

//Reducer attributes: 
// 1. Reducers are 'pure' functions - a function that uses only its arguments to return something (only within its scope)
// ex of 'pure' function
// let a = 10
// const add = (b)=> b + a // this is not a 'pure' function because uses a variable outside of the function
// const add = (b, c)=> b + c //this is a 'pure' function because uses variables in the function
// 2. Never change state or action - dont 'directly' reassign state or action just use them in the function to manipulate state and return it as a new object.


const countReducer = (state ={ count:0 }, action)=>{
    switch(action.type){
        case 'INCREMENT_COUNT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
                };        
        case 'RESET':
            return {
                count: 0
                };        
        default: 
            return state;    
    }//similar to if statements but we can add more action types
};
//state ={ count:0 } means that the default would be an object with the count = 0

const store = createStore(countReducer); 
// creatStore we will call once to create the store and it accepts 2 arguments 1st a function and 2nd ..
// reference the reducer function dont put brackets next to it.

console.log(store.getState());
// store.getState(); returns the current state object


const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});//watches for changes in the store and it takes a function

// unsubscribe(); - if you put this after a disatch all other dispatch changes wont show up. If not all dispatchs will be tracked.

// Actions - an object gets sent to the store

//Incrementing the count
// store.dispatch({
//     type: 'INCREMENT_COUNT',
//     incrementBy: 5
// }); //sends object to the store with the type of action we want to do
//convention to use all caps and if more words use underscore

store.dispatch(incrementCount()); // thats how to use an action function

store.dispatch(incrementCount({incrementBy: 5})); 

//Decrementing the count

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 10}));



// Resetting the count

// store.dispatch({
//     type: 'RESET'
// });

store.dispatch(resetCount());


//Setting the count

// store.dispatch({
//     type: 'SET',
//     count: 101
// });

store.dispatch(setCount({count: -1010}));





