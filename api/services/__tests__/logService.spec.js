import logError from '../logService';

describe('Test for log service', () => {
  // FileExists
  test('Log error to file error-log', async () => {
    try {
      const res = await logError(new Error('Þetta er villa'));
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });
});
