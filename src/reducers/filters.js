import moment from "moment";

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), //https://momentjs.com/docs/#/manipulating/ - i want to see expenses from the start of the month
    endDate: moment().endOf('month') //till the end of the month
};

export default (state = filtersReducerDefaultState, action)=>{
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