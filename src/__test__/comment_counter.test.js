import { commentCounter } from '../module/comment_api_functions.js';
import commentList from '../module/mock_comments.js';

describe('Comment Counter', () => {
  test('Should return the Exact number of comments', () => {
    expect(commentCounter(commentList)).toBe(commentList.length);
  });
  test('Adding a new comment should be counted', () => {
    const newComment = {
      comment: 'This photo is amazing. I will love to eat more of this.',
      creation_date: '09-May, 2022',
      username: 'Jude',
    };
    commentList.push(newComment);
    commentList.push(newComment);
    expect(commentCounter(commentList)).toBe(4);
  });
  test('Response with no comment should return zero count', () => {
    expect(commentCounter([])).toBe(0);
  });
});