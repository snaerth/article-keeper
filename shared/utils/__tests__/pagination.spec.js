import createPagination from '../pagination';

describe('Test for pagination helper', () => {
  test('Create pagination', () => {
    const pagination = {
      limit: 50,
      pages: 3,
      page: 1,
      total: 122,
    };

    const result = createPagination(pagination);
    expect(result).toHaveProperty('limit');
    expect(result).toHaveProperty('pages');
    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('prev');
    expect(result).toHaveProperty('next');

    expect(result).toEqual({
      limit: 50,
      pages: 3,
      page: 1,
      total: 122,
      prev: 1,
      next: 2,
    });
  });
});
