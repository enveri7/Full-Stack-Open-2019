import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('SimpleBlog component tests', () => {

    const blog = {
        title: "Blogin title",
        author: "Seppo Kääriäinen",
        likes: 3
    }

    it('component shoudl have right context', async () => {
        const component = render(
            <SimpleBlog blog={blog} />
        )

        expect(component.container).toHaveTextContent(
            `blog has ${blog.likes} likes`
        )
        expect(component.container).toHaveTextContent(
            `${blog.title} ${blog.author}`
        )
    })

    it('clicking the button calls event handler once', async () => {

        const mockHandler = jest.fn()

        const { getByText } = render(
            <SimpleBlog blog={blog} onClick={() => mockHandler()} />
        )

        const button = getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(2)
    })

})