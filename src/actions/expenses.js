import { v4 as uuidv4 } from 'uuid';; // to generate random ids
import { app, db } from '../firebase/firebase';
import { getDatabase, ref, set, onValue, update, remove, off, push, get, child, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";


// ADD_EXPENSE
 export const addExpense = (expense)=>({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {})=>{
    return (dispatch)=>{
        const {
            description = '',
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData;
        const expense = { description, note, amount, createdAt };
        return push(ref(db, 'expenses'), expense).then((ref)=>{
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
        
    };
};


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {})=>({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id }= {})=>{
    return (dispatch)=>{
        return remove(ref(db, `expenses/${id}` )
          ).then(()=>{
            dispatch(removeExpense({ id }));
          })
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates)=>{
    return (dispatch)=>{
        return update(ref(db, `expenses/${id}`), updates).then(()=>{
              dispatch(editExpense(id , updates));
            });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses)=>({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = ()=>{
    return (dispatch)=>{
        return get(child(ref(db), 'expenses')).then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot)=>{
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    }; 
};


