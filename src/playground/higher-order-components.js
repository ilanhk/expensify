//Higher Order Component (HOC) - A component(HOC) that renders another component (regular component(s))
// reuse code by using the same HOC
// Render hijacking
// Prop manipulation
// Abstract State

import React from "react";
import ReactDOM  from "react-dom";

//Example: 

//a regular component
const Info = (props)=> (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);


const withAdminWarning = (WrappedComponent)=>{
    return (props)=>(
        <div>
            {props.isAdmin && <p>This is private info. Please dont share!</p>}
            <WrappedComponent {...props}/>
        </div>
    ); // the result of this return is the higher order component (HOC)
    // {...props} means that whatever props we get for the <AdminInfo /> will be passed on to the child <WrappedComponent />
    // if props.isAdmin is true the message will show if not it wont show
};
// convention to use 'WrappedComponent' as a function argument


const requireAuthentication = (WrappedComponent)=>{
    return (props)=>(
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props}/>
            ) : (
                <p>Please Login to view the info</p>
                )
            }
            
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo =requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details"/>, document.getElementById('app'));