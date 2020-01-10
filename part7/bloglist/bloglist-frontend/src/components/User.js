import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const User = (props) => {
    console.log(props)
    const [user, setUser] = useState(null);
  useEffect(() => {
      if(props.users !== undefined) {
        let uname = props.match.params.name;
        console.log(uname)
        let temp = props.users.filter(u => {
            return u.username === uname
        })
        console.log(temp)
        if(temp[0]) {
            setUser(temp[0])
        }

    }
  }, [props.users]);

  const displayBlogs = (blogs) => {
    return (
        <ul>
            {blogs.map((b) => {
                return (
                    <li key={b.id}>{b.title}</li>
                )
            })}
        </ul>
    )
  }

  return (
      <div>
        <p>User</p>
        {user !== null &&
            <div>
                <h2>{user.username}</h2>
                <h3>Added blogs</h3>
                {displayBlogs(user.blogs)}
            </div>
        }
      </div>
  )

}

const mapStateToProps = state => {
    console.log(state)
  return {
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps, null)(User));
