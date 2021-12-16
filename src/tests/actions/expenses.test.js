import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'this was last months rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});
// expect.any(String) this means we want to make sure the id is a string since we cant generate the same random id in this test case

test('should setup add expense object with default', ()=>{
    const expenseData = { 
        description: '',
        note: '', 
        amount: 0, 
        createdAt: 0 
    };
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});