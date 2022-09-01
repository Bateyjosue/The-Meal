import { commentCounter } from '../module/comment_api_functions.js';
import commentList from '../module/mock_comments.js';

describe('Comment Counter', () => {
  test('Should return the Exact number of comments', () => {
    expect(commentCounter(commentList)).toBe(commentList.length);
  });
});