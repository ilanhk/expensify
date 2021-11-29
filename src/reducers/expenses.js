// Expenses Reducer

const expensesReducerDefaultState = []

export default (state = expensesReducerDefaultState, action)=>{
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
