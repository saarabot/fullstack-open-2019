import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import UsersList from './UsersList'

const AppMenu = ({ user, handleLogout }) => {
    let divStyle = {
        display: 'inline-flex',
        padding: '15px',
        backgroundColor: 'gray',
        width: '90%',
        marginBottom: '10px'
    }
    let itemStyle = {
        paddingLeft: '10px'
    }
    return(
        <Router>
            <div style={divStyle}>
            <Link style={itemStyle} to="/">Blogs</Link>
            <Link style={itemStyle} to="/users">Users</Link>
            <div style={itemStyle}>{user.username} is logged in <button onClick={handleLogout}><i>logout</i></button></div>
            </div>
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/users" render={() => <UsersList />} />
        </Router>
    )
}

export default AppMenu