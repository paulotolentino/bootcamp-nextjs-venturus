import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import PostList from '../components/PostList';

describe('PostList', () => {
  const posts = [
    {
      id: 1,
      title: 'Test post title',
      picture: '::test_url::',
      content: 'Test post content',
    },
  ];
  const EMPTY_MESSAGE = 'No posts found';

  it('renders empty message', () => {
    render(<PostList posts={[]} />);

    expect(screen.getByRole('alert')).toHaveTextContent(EMPTY_MESSAGE);
  });

  it('renders posts', () => {
    render(<PostList posts={posts} />);

    const postList = screen.getByTestId('PostList');
    expect(
      within(postList).getAllByTestId('PostListItem').length
    ).toBeGreaterThan(0);
  });
});
