import React from "react";
import { connect } from "react-redux";
import 'react-dates/initialize';
import { DateRangePicker } from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters";

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null,
        startDate: this.props.filters.startDate,
        endDate: this.props.filters.endDate

    };

    onDatesChange = ({ startDate, endDate})=>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (calendarfocused)=>{
        this.setState(()=>({ calendarfocused }));
    };

    render(){
        return  (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e)=>{
                    this.props.dispatch(setTextFilter(e.target.value));
                }}/>
                <select  value={this.props.filters.sortBy} onChange={(e)=>{
                    let v = e.target.value;
                    if (v === 'amount'){
                        this.props.dispatch(sortByAmount());
                    } else if(v === 'date'){
                        this.props.dispatch(sortByDate());
                    }
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.state.startDate}
                    startDateId={"dwjkhqkehwqjkeq"}
                    endDate={this.state.endDate}
                    endDateId={"cxzvcxbzbczxbz"}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                />
            </div>
        );
    };
};
//onChange takes a funciton and every single time the input changes the function fires
// e is the event argument 
//e.target.value is the value text from the input
//focusedInput

const mapStateToProps = (state)=>{
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);