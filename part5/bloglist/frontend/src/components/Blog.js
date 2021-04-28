import React, {useState} from 'react'
import './blog.css'
import PropTypes from 'prop-types'

const Blog = ({blog, blogDeleter, user}) => {
    const [visible, setVisible] = useState(false)

    const viewHandler = () => {
        setVisible(!visible)
        console.log(user)
    }

    const deleteHandler = () => {
        blogDeleter(blog.id)
    }

    return (
        <div className="blogpost">
            <div>
                Title: {blog.title}
                <button className="view-button" onClick={viewHandler}>view</button>
                {blog.user.username === user.username && (
                    <button className="delete-button" onClick={deleteHandler}>delete</button>
                )}
            </div>
            {visible && (
                <>
                <div>
                    Author: {blog.author}
                </div>
                <div>
                    URL: {blog.url}
                </div>
                <div>
                    Likes: {blog.likes}
                </div>
                </>
            )} 
            
            <br></br>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    blogDeleter: PropTypes.func.isRequired
}

export default Blog