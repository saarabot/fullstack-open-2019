import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const testFunction = () => {
    //console.log('blah')
}

const loggedUser = 'test man';

test('renders blog with title and author by default', () => {
    const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test man',
    likes: 3,
    user: {
        username: 'test username'
    },
    reloadList: testFunction
  }

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} reloadList={testFunction}/>
  )
  //const blogContainer = component.container.querySelector('.blogContainer')
  //console.debug(blogContainer);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'test man'
  )
  const rest = component.container.querySelector('.expanded')
    expect(rest).not.toBeVisible();



})


test('clicking the title expands blog', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'test man',
        likes: 3,
        user: {
            username: 'test username'
        },
      }

    const component = render(
        <Blog blog={blog} loggedUser={loggedUser} reloadList={testFunction}/>
      )


    const button = component.container.querySelector('.title')
    fireEvent.click(button)

    const rest = component.container.querySelector('.expanded')
    expect(rest).toBeVisible();

  })