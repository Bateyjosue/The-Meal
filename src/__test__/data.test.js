import { countItem } from '../module/data.js';

describe('ItemCounter', () => {
  const array = [{ item_id: '001' }, { item_id: '002' }, { item_id: '003' }];
  it('Should return the Exact length of the array of items', () => {
    expect(countItem(array)).toBe(array.length);
  });

  it('[2, 5, 6, 5] Should return 4', () => {
    expect(countItem([2, 5, 6, 5])).toEqual([2, 5, 6, 5].length);
  });
});