import dbSortValues from '../dbService';

describe('Run tests for db service', () => {
  test('Check sort values array', () => {
    const sortVals = dbSortValues();
    expect(sortVals).toEqual([1, -1, '1', '-1', 'asc', 'desc']);
  });
});
