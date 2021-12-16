import moment from 'moment';
import { 
    setStartDate, 
    setEndDate, 
    setTextFilter,
    sortByDate,
    sortByAmount 
} from "../../actions/filters";


test('should generate set start date action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should generate a set text filter action object with text values', ()=>{
    const action = setTextFilter('blah blah blah');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'blah blah blah'
    });
});

test('should generate a set text filter action object with default', ()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should generate action object for sort by date', ()=>{
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should generate action object for sort by amount', ()=>{
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});
