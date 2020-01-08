import React, { useEffect } from 'react';
import Notification from './components/Notification';
import { useField } from './hooks';
import { connect } from 'react-redux'
import { login, setUser, logout } from './reducers/loginReducer'
import { token } from './reducers/blogReducer'
import AppMenu from './components/AppMenu'

const App = (props) => {
  const { login, token, setUser, user, isLogged, logout } = props
  const username = useField('text');
  const password = useField('password');

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedUser');
    if(logged) {
        let temp = JSON.parse(logged);
        setUser(temp);
        token(temp.token);
    }
  }, []);

  useEffect(() => {
    if(user !== undefined) {
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      token(user.token);
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let credentials = {
        username: username.value,
        password: password.value
      }
      await login(credentials);
      username.reset();
      password.reset();

    } catch (exception) {
      console.log(exception);
      //notificate error
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
            username:
            <input
              type="text"
              value={username.value}
              name="Username"
              onChange={username.onChange} />
        </div>
        <div>
            password:
            <input type="password"
            value={password.value}
            name="Password"
            onChange={password.onChange} />
        </div>
        <button type="submit">login</button>
    </form>
  );

  const handleLogout = () => {
    logout()
    window.localStorage.clear();
    window.location.reload();
  }

  if(isLogged) {
    return (
      <div className="App">
        <Notification />
        <header className="App-header">
          <h1>Bloglist</h1>
        </header>
        <AppMenu user={user} handleLogout={handleLogout}/>
      </div>
    );
  } else {
    return loginForm()
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
    isLogged: state.login.logged
  }
}

const mapDispatchToProps = {
  login, token, setUser, logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
