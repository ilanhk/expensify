import React from 'react';
import moment from 'moment'; // Library that allows us Parse, validate, manipulate,and display dates and times in JavaScript: https://momentjs.com/
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates'; //airbnb Library to pick dates from a nice calender https://github.com/airbnb/react-dates



//const date = new Date(); react has a date object but api is terrible so not going to use it.
// use moment its better and its the standard for dates
const now = moment(); // this would represent the current point in time.
console.log(now.format('MMM Do, YYYY')); // look at this to understand: https://momentjs.com/docs/#/displaying/

export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() :'',
            createdAt: props.expense ?  moment(props.expense.createdAt) : moment(),
            calendarfocused: false,
            error: ''
        };
    };

    onDescriptionChange = (e)=>{
        const description = e.target.value;
        this.setState(()=>({ description }));
    };

    onNoteChange = (e)=>{
        const note = e.target.value;
        this.setState(()=>({ note }));
    };

    onAmountChange = (e)=>{
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){   //if there is no amount or amount matches this regular expression
            this.setState(()=>({ amount }));
        };
        
    };

    onDateChange = (createdAt)=>{
        if(createdAt){
            this.setState(()=>({ createdAt }));
        }; // the if statement prevents user from clearing the date input value  
    };
    // argument takes moment

    onFocusChange = ({ focused })=>{
        this.setState(()=>({ calendarfocused: focused }));
    };

    onSubmit = (e)=>{
        e.preventDefault(); // to prevent from having a full page refresh when you click submit

        if(!this.state.description || !this.state.amount){
            this.setState(()=>({ error: 'Please provide description and amount' }));
        } else{
            //Clear the error
            this.setState(()=>({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) *100, //* 100 to convert to cents
                createdAt: this.state.createdAt.valueOf(), // .valueOf() is to get a timestamp off of the moment object
                note: this.state.note
            });
        };
    };

    render (){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarfocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >

                    </textarea>
                    <button >Add Expense</button>
                </form>
            </div>
        );
    };
};
// autoFocus will make sure that when you visit the page it will automatically put the cursor and the focus on that input
// https://regex101.com/ for Regular Expressions. add this regular expression ^\d{1,}(\.\d{0,2})?$ to see what it means. 
// good to use regular expressions so we can limit the user on what type of input we want.
// <SingleDatePicker date onDateChange focused onFocusChange/> for this imported component we need all these props for it to work. We can also create our own props to add
// numberOfMonths={1} means how many months you want to see at a time when you open the calendar. 1 is that i want to see only 1 month 
// need to add this: isOutsideRange={()=>false} so that a user can access the days in the past instead of only picking days from present to future bc by default the user wouldnt be able to pick those days