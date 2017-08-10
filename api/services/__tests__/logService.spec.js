import log from '../logService';

describe('Run tests for log service', () => {
  test('Check if bunyan log has object propertys', () => {
    expect(log).toHaveProperty('streams');
    expect(log).toHaveProperty('serializers');
    expect(log.streams[0]).toHaveProperty('stream');
    expect(log).toHaveProperty('serializers.err');
    expect(log).toHaveProperty('serializers.req');
    expect(log).toHaveProperty('serializers.res');
  });
});
