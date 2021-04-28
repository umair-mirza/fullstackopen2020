import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
    let component

    beforeEach(() => {
        const blog = {
            title: 'this is a test blog post',
            author: 'Mc Filley',
            url: 'http://www.test123.com',
            likes: 3,
            user: {
                username: 'tttt',
                password: '111111'
            }
        }
    
        const user = {
            username: 'tttt',
            password: '111111'
        }
    
        const mockHandler = jest.fn()
        
        component = render(
            <Blog blog={blog} user={user} />
        )
    })

    test('renders only title by default', () => {
        expect(component.container).toHaveTextContent(
            'this is'
        )
        expect(component.container).not.toHaveTextContent(
            'Mc Filley'
        )
    })

    test('renders author and url after click on view button', () => {
        
        const button = component.getByText('view')
        fireEvent.click(button)
    
        expect(component.container).toHaveTextContent(
            'Mc Filley'
        )
        expect(component.container).toHaveTextContent(
            'Likes'
        )
    })
})
