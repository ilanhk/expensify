//Get Visible Expenses

export default (expenses, {text, sortBy, startDate, endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; // if typeof startDate !== 'number' is false then it would run the other code next to ||
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); // includes means if the array has that item.

        return startDateMatch && endDateMatch && textMatch;
        //if all of these are true item will be kept in array 
        //if any of these are false the whole thing will result in false because using '&&' which would result in the item being removed from the array.
    }).sort((a, b)=>{
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount'){
            return a.amount < b.amount? 1 : -1
        }
        // if a.createdAt < b.createdAt is true b comes first if not a comes first because we want to most recent expense
        // documentation for .sort() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
        //TimeStamps (only + or - integer values) (counting in miliseconds)
        // positive numbers go foward in time negative goes backwards
        // timestamp start date is 01/01/1970 (unix epoch)
    });
};

