import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/test-expenses-data';

test('should filter by text value', ()=>{
    const filters ={
        text: 'e', //to see if the description has the letter 'e' in it
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]);
});

// test('should filter by startDate', ()=>{
//     const filters = {
//         text: '', 
//         sortBy: 'date',
//         startDate: moment(0),
//         endDate: undefined
//     };

//     const result = selectExpenses(expenses, filters);
//     expect(result).toEqual([expenses[2], expenses[0]]);
// });