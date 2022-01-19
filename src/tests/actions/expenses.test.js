import configureMockStore from 'redux-mock-store'; //docs: https://github.com/reduxjs/redux-mock-store
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/test-expenses-data';
import { db } from '../../firebase/firebase';
import { getDatabase, ref, set, onValue, update, remove, off, push, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";

const createMockStore = configureMockStore([thunk]) //created a mock redux store with middleware thunk

test('should setup remove expense action object', ()=>{
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});
// toEqual is to make sure all objects are the same toBe wont work in this case

test('should setup edit expense action object', ()=>{
    const action = editExpense('321cba',  {note: 'blah blah blah'})

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '321cba',
        updates: {
            note: 'blah blah blah'
        }
    });
});


test('should setup add expense object with provided values', ()=>{

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});
// expect.any(String) this means we want to make sure the id is a string since we cant generate the same random id in this test case



test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Laptop',
        amount: 22000,
        note: '',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        const reference = ref(db, `expenses/${actions[0].expense.id}`);
        onValue(reference, (snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
        });
        done(); //Need to tell jest a test is async by adding 'done' as an arguement and done() at the end
    });
});


test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });
        const reference = ref(db, `expenses/${actions[0].expense.id}`);
        onValue(reference, (snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefault);
        });
        done(); //Need to tell jest a test is async by adding 'done' as an arguement and done() at the end
    });
});


// test('should setup add expense object with default', ()=>{
//     const expenseData = { 
//         description: '',
//         note: '', 
//         amount: 0, 
//         createdAt: 0 
//     };
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }
//     });
// });