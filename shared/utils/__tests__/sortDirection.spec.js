import SortDirection from '../sortDirection';

describe('Test for sort direction', () => {
  test('Check sort directions name', () => {
    expect(SortDirection).toHaveProperty('ASC', 'ASC');
    expect(SortDirection).toHaveProperty('DESC', 'DESC');
  });
});
