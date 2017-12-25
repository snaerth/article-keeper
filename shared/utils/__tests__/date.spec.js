import formatISODateTime, { checkTime, formatISODate, formatDateWithMonthName } from '../date';

describe('Run tests for date', () => {
  test('Check if time is bigger or smaller than zero', () => {
    const result = checkTime('9');
    expect(result).toMatch('09');
    expect(result).not.toBe('9');
  });

  test('Format date string to ISO date time format', () => {
    const success = formatISODateTime('2017-08-11T12:41:59.791Z');
    expect(success).toMatch('2017-08-11 12:41:59');
    const fail = formatISODateTime('test');
    expect(fail).toThrowErrorMatchingSnapshot();
  });

  test('Format date string to ISO date format', () => {
    const success = formatISODate('2017-08-11T12:41:59.791Z');
    expect(success).toMatch('2017-08-11');
    const fail = formatISODate('test');
    expect(fail).toThrowErrorMatchingSnapshot();
  });

  test('Format date string to date with month name', () => {
    const success = formatDateWithMonthName('2017-08-11T12:41:59.791Z');
    expect(success).toMatch('11 august 2017');
    const fail = formatISODate('test');
    expect(fail).toThrowErrorMatchingSnapshot();
  });
});
