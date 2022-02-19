import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PostListItem from '../components/PostListItem';

describe('PostListItem', () => {
  const post = {
    id: 1,
    title: 'Test post title',
    picture: '::test_url::',
    content: 'Test post content',
  };

  it('renders title', () => {
    render(<PostListItem post={post} />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      post.title
    );
  });

  it('renders picture', () => {
    render(<PostListItem post={post} />);

    const image: HTMLImageElement = screen.getByAltText(post.title);
    expect(image.src).toContain(post.picture);
  });

  it('is clickable', async () => {
    render(<PostListItem post={post} />);

    // TO BE IMPLEMENTED
  });
});
