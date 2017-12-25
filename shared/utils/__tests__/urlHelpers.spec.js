import getParameterByName, { formDataToQueryString } from '../urlHelpers';

describe('Test for query params helper', () => {
  test('Get param value from query string', () => {
    const result = getParameterByName('http://www.example.com/?limit=50&pages=3', 'limit');
    expect(result).toEqual('50');
  });

  test('Create querys string from object', () => {
    const test = {
      limit: 50,
      pages: 3,
    };

    const result = formDataToQueryString(test);
    expect(result).toEqual('limit=50&pages=3');
  });
});
