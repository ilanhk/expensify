import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ()=>(
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);
// <Link> is great takes you to a new page without refresh part of react-router (Client Side routing)

export default NotFoundPage;