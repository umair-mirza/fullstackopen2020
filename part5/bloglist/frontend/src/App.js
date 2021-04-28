import React, {useEffect, useState} from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import {getAll, createBlog, deleteBlog, setToken} from './services/blogs'
import {login} from './services/login'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getAll()
    .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedOnUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
        const loggedUser = await login(loginObject)

        window.localStorage.setItem(
          'loggedOnUser', JSON.stringify(loggedUser)
        )

        setUser(loggedUser)

        console.log(loggedUser)

        setMessage('Successfully Logged in')
        setTimeout(() => {
            setMessage(null)
        }, 3000)

    } catch(error) {
        setErrorMessage('Wrong Credentials')
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
    }
}

const addBlog = async (blogObject) => {
  try {

      setToken(user.token)
      const newBlog = await createBlog(blogObject)
      const newblogs = blogs.concat(newBlog)
      setBlogs(newblogs)
      console.log('users token:', user.token)

      setMessage('Blog Post Created Successfully')
      setTimeout(() => {
        setMessage(null)
    }, 3000)
  } catch(error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
    }, 3000)
  }
  
}

const blogDeleter = async (blogId) => {
  try {
    setToken(user.token)

    if(window.confirm("Are you sure you want to delete the Post?")) {
      await deleteBlog(blogId)
    } else {
      return
    }

    const filtered = blogs.find(blog => blog.id === blogId)
    const index = blogs.indexOf(filtered)
    blogs.splice(index, 1)

    setMessage('Blog deleted successfully')
    setTimeout(() => {
      setMessage(null)
  }, 3000)

  } catch(error) {
    setErrorMessage(error.response.data.error)
    setTimeout(() => {
      setErrorMessage(null)
  }, 3000)
  }
}

const logoutHandler = () => {
  window.localStorage.removeItem('loggedOnUser')
  setUser(null)
}

const sortedBlogs = blogs.sort(function(a, b){return b.likes - a.likes})

  return (
    <>
      <h1>Blogs List</h1>
      <br/>
      <Notification message={message} error={errorMessage} />
      {user && <div><h3>{user.name} Logged in</h3> <button onClick={logoutHandler}>Logout</button></div>}
      <br/>
      {!user && <Login handleLogin={handleLogin} />}
      <br/>
      {user && <CreateBlogForm addBlog={addBlog} />}
      <br/>
      {user && sortedBlogs && sortedBlogs.map(blog => 
        <Blog key={blog.id} blog={blog} blogDeleter={blogDeleter} user={user} />
      )}
    </>
  )
}




export default App;
