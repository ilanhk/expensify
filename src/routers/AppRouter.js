import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'; // allows us to create muliple pages using 'Route'. dom is for websites and native is for phone apps. 
// Documentation: https://reactrouter.com/
import { createBrowserHistory } from 'history'; //docs https://github.com/remix-run/history/blob/8117ab21f5e339fabaa6ed1d80290fe3cee40c27/docs/installation.md
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage  from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory(); // <BrowserRouter/> already comes with history but having this variable we can manipulate it.

const AppRouter = ()=>(
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashBoardPage}/>
                <PrivateRoute path="/create" component={AddExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);
// Route takes in 2 props the path and a component. So it means that if it matches this path render this component
// Browser Router expects a single element inside so we use a div to have multiple routes
// exact=true means that  it will only show this component if it exactly matches this path. because this component can show up on other pages since it has the same starting path.
//Swith do: it will go through all the routes and stop on the path that matches. If no path matches it will continue to the bottom the 404pages doesnt have a path but it means it always matches with any path.
//path="/edit/:id" whatever comes after edit it will go.
export default AppRouter;