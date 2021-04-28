import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

describe('Creating Blog Form tests', () => {
    let component

    test('calls event handler correctly', () => {

        const addBlog = jest.fn()

        component = render(
            <CreateBlogForm addBlog={addBlog} />
        )

        const button = component.getByText('Create Blog Post')
        fireEvent.click(button)

        const input = component.container.querySelector('#title')
        const form = component.container.querySelector('form')

        fireEvent.change(input, {
            target: {value: 'dummy title'}
        })
        fireEvent.submit(form)

        expect(addBlog.mock.calls).toHaveLength(1)
        expect(addBlog.mock.calls[0][0].title).toBe('dummy title')
    })
})