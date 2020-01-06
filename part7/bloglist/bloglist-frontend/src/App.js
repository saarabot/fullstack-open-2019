import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import blogService from './services/blogs';
import login from './services/login';
import FormBlog from './components/BlogForm';
import Togglable from './components/Togglable';
import { useField } from './hooks';
import { connect } from 'react-redux'
import BlogList from './components/BlogList'

const App = (props) => {

  //const [username, setUsername] = useState('');
  const username = useField('text');
  const password = useField('password');
  //const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect( () => {
    console.log(props)
    const logged = window.localStorage.getItem('loggedUser');
    if(logged) {
        const user = JSON.parse(logged);
        setUser(user);
        blogService.setToken(user.token);
        blogService.getAll().then(res => {
          //setBlogs(res);
        })
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login.login({ username: username.value, password: password.value });
      window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      blogService.getAll().then(res => {
        //setBlogs(res);
      });
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

  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  /*
  const blogContent = () => {
    if(initialBlogs === null) {
      blogService.getAll().then(res => {
        setBlogs(res);
      });
      }
      return (
      <div>
        <h3>{user.username} is logged in <button onClick={logout}><i>logout</i></button></h3>
        <h2>Blogs</h2>
      </div>
      )

  };*/

  let mainContent = null;
  if(user === null) {
    mainContent = loginForm()
  } else {
    //mainContent = blogContent();
    mainContent = null
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bloglist</h1>
      </header>

      <Notification />
      <Togglable buttonLabel="Add new blog">
        <FormBlog />
      </Togglable>
      <BlogList />
      <main>
        {mainContent}
      </main>
    </div>
  );
}

export default connect(null, null)(App);
