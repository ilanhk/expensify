//we  cant do a regular snapshot with ExpenseForm component because it uses moment which creates different values each time.
//so we need to create a mock of the moment library. Documentation: https://jestjs.io/docs/manual-mocks

// import moment from "moment"; // we cant import moment for this case because it would cause a 'stack trace error' -3hen a function calls itself over and over

const moment = jest.requireActual('moment'); //  so we need to just get the original version moment module by doing this

export default (timestamp = 0)=>{
    return moment(timestamp);
};