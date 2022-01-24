import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //need to install react-redux to get <Provider/>
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'; // need to install it. This would make sure all internet browsers would start from the exact same place and load up the css/scss files correctely. We did this by adding a css reset. good to make it a cross browser friendly app
import './styles/styles.scss'; //need to load in the css file to make it work
import 'react-dates/lib/css/_datepicker.css' //need the css in order for react-dates to work
import './firebase/firebase'; //https://console.firebase.google.com/project/expensify-f1026/overview
import { getAuth, onAuthStateChanged } from "firebase/auth"; // https://firebase.google.com/docs/auth/web/manage-users



const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
// Any component nested in <Provider/> can have access to the prop store 

let hasRendered = false;
const renderApp = ()=>{
  if (!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app')); // need this to render stuff to the screen
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(()=>{
      renderApp();
      if(history.location.pathname === '/'){
        history.push('/dashboard');
      }
    });
    // console.log('login');
  } else {
    // User is signed out
    store.dispatch(logout());
    renderApp();
    history.push('/'); //when a user logout they will be redirected to '/'
    // console.log('logout');
  }
});
// https://firebase.google.com/docs/reference/js/firebase.User


