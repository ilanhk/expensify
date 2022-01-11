export default (expenses)=>{
    return expenses
            .map((expense)=> expense.amount)
            .reduce((sum, value)=> sum + value, 0); // all this first makes an array of the amounts from expense then it adds everything up starting at the index of 0. 
};