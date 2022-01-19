import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //need to install react-redux to get <Provider/>
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'; // need to install it. This would make sure all internet browsers would start from the exact same place and load up the css/scss files correctely. We did this by adding a css reset. good to make it a cross browser friendly app
import './styles/styles.scss'; //need to load in the css file to make it work
import 'react-dates/lib/css/_datepicker.css' //need the css in order for react-dates to work
import './firebase/firebase'; //https://console.firebase.google.com/project/expensify-f1026/overview



const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
// Any component nested in <Provider/> can have access to the prop store 

ReactDOM.render(jsx, document.getElementById('app'));// need this to render stuff to the screen

