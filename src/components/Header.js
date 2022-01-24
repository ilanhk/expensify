import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout })=>(
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
);
//NavLink same like Link but has more props for navigation
// activeClassName="" is class but for NavLink

const mapDispatchToProps = (dispatch)=> ({
    startLogout: ()=> dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);