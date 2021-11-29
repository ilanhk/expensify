import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // allows us to create muliple pages using 'Route'. dom is for websites and native is for phone apps. 
// Documentation: https://reactrouter.com/
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={ExpenseDashBoardPage} exact={true}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);
// Route takes in 2 props the path and a component. So it means that if it matches this path render this component
// Browser Router expects a single element inside so we use a div to have multiple routes
// exact=true means that  it will only show this component if it exactly matches this path. because this component can show up on other pages since it has the same starting path.
//Swith do: it will go through all the routes and stop on the path that matches. If no path matches it will continue to the bottom the 404pages doesnt have a path but it means it always matches with any path.
//path="/edit/:id" whatever comes after edit it will go.
export default AppRouter;