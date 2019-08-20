import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import login from './services/login';
import AddBlog from './components/AddBlog';

const App = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [initialBlogs, setBlogs] = useState(null);
  const [notification, setNotification] = useState(null);


  useEffect( () => {
    const logged = window.localStorage.getItem('loggedUser');
    if(logged) {
        const user = JSON.parse(logged);
        setUser(user);
        blogService.setToken(user.token);
        blogService.getAll().then(res => {
          setBlogs(res);
        })
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login.login({username, password});
      window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.getAll().then(res => {
        setBlogs(res);
      });
  } catch (exception) {
      let notification = {
        type: 'error',
        message: 'Login failed'
      }
      setNotification(notification);
      setTimeout(() => {
        setNotification(null);
      }, 1000);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
            username: <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
            password: <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
  );

  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  const blogContent = () => {
    if(initialBlogs !== null) {
      return (
      <div>
        <h3>{user.username} is logged in <button onClick={logout}><i>logout</i></button></h3>
        <h2>Blogs</h2>
        <AddBlog />
        {initialBlogs && initialBlogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
      )
    }
  };

  let mainContent = null;
  if(user === null) {
    mainContent = loginForm()
  } else {
    mainContent = blogContent();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bloglist</h1>
      </header>
      {notification &&
        <Notification type={notification.type} message={notification.message} />
      }
      <main>
        {mainContent}
      </main>
    </div>
  );
}

export default App;
