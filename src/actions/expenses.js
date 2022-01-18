import { v4 as uuidv4 } from 'uuid';; // to generate random ids
import { app, db } from '../firebase/firebase';
import { getDatabase, ref, set, onValue, update, remove, off, push, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";


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
        push(ref(db, 'expenses'), expense).then((ref)=>{
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

// EDIT_EXPENSE
export const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});