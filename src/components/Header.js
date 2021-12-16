import React from 'react';
import { NavLink } from 'react-router-dom'; 

const Header = ()=>(
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>
    </header>
);
//NavLink same like Link but has more props for navigation
// activeClassName="" is class but for NavLink

export default Header;