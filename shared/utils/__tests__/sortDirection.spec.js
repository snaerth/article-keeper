import SortDirection from '../sortDirection';

describe('Test for sort direction', () => {
  test('Check sort directions name', () => {
    expect(SortDirection).toHaveProperty('ASC', 'asc');
    expect(SortDirection).toHaveProperty('DESC', 'desc');
  });
});
