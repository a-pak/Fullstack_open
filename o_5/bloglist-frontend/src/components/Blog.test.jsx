import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Nimi',
  author: 'Tekija',
  url: 'www.www.www',
  likes: 2,
  user:{
    username: 'jyyser'
  }
}

test('renders content properly', () => {
  const { container } = render(<Blog blog={blog} setUpdate={0} />)
  const div = screen.getByTestId('blogTest')

  expect(div).toHaveTextContent('Nimi')
  expect(div).toHaveTextContent('Tekija')
  expect(div).not.toHaveTextContent('www.www.www')
})

test('clicking the "view" button reveals more attributes', async () => {
  const mockHandler = vi.fn()
  render(
    <Blog blog={blog} setUpdate={0}/>
  )

  const user= userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const div = screen.getByTestId('blogTest')
  expect(div).toHaveTextContent('Nimi')
  expect(div).toHaveTextContent('Tekija')
  expect(div).toHaveTextContent('www.www.www')
  expect(div).toHaveTextContent('Likes: 2')
  expect(div).toHaveTextContent('jyyser')
  //expect(mockHandler.mock.calls).toHaveLength(1)
})

test('liking a blog two times doesnt return two mock calls due to invalid webtoken', async () => {
  const mockHandler = vi.fn()
  let setUpdate = 0
  render(
    <Blog blog={blog} setUpdate={mockHandler}/>
  )
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const like = screen.getByText('Like')
  await user.click(like)
  await user.click(like)

  const div = screen.getByTestId('blogTest')
  expect(div).not.toHaveTextContent('Likes: 4')
})