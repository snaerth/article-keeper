import splitToChunks from '../arrayHelpers';

describe('Run array helpers tests', () => {
  test('Split array to chunks', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunkSize = 3;
    const chunksArr = splitToChunks(arr, chunkSize);
    expect(chunksArr).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });
});
