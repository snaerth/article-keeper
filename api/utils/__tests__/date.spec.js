import parseDateYearMonthDay from '../date';

describe('Run tests for dates', () => {
  it('Fail for parse date to YYYY-mm-dd format', async () => {
    const date = await parseDateYearMonthDay('1983-04-27');
    expect(date).toEqual(new Date('1983-04-27T00:00:00.000Z'));
  });

  it('Parse date to YYYY-mm-dd format', async () => {
    const date = await parseDateYearMonthDay('Fail-04-30');
    expect(date).toThrowErrorMatchingSnapshot();
  });
});
