import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers, getUser } from '../reducers/userReducer'

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
                    <p>{user.name !== undefined ? user.name: 'ei nimeä' }</p>
                    <p>{user.username !== undefined ? user.username: 'ei käyttäjänimeä' }</p>
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


export default connect(mapStateToProps, { getUsers })(UsersList)