import React, {useState} from 'react'

const CreateBlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [toggle, setToggle] = useState(false)

  const blogCreator = (e) => {
    e.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }

    return (
        <div>
          <button onClick={handleToggle}>{!toggle ? 'Create Blog Post' : 'Cancel'}</button>
          {toggle && (
            <div>
              <h3>Create Blog Post</h3>
              <div>
                  <form onSubmit={blogCreator}>
                    <div>
                      Title: <input id="title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                      Author: <input id="author" type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                      Url: <input id="url" type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <button id="submit-button" type="submit">Submit</button>
                  </form>
              </div>
            </div>
          )}
            
        </div>
    )
}

export default CreateBlogForm