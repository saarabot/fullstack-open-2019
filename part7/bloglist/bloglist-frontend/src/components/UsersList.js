import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import { withRouter, Link } from 'react-router-dom'

const UsersList = (props) => {
    console.log(props)
    useEffect(() => {
        console.log('useEffect')
        props.getUsers()
    }, [])

    useEffect(() => {

    }, [props.users])

    const displayUserList = () => {
        return props.users.map((user) => {
            return (<div key={user.id} style={{ 'border': '1px solid black' }}>
                    <Link to={`/user/${user.username}`}>{user.username !== undefined ? user.username: 'ei käyttäjänimeä' }</Link>
                    <p>blogs created: {user.blogs.length}</p>
                </div>)
        })
    }

    return(
        <div>
            <h2>users</h2>
            {props.users.length > 0 && displayUserList()}
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
      users: state.users,
      selectedUser: state.user
    }
  }


export default withRouter(connect(mapStateToProps, { getUsers })(UsersList))