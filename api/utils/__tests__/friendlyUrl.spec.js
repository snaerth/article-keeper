import convertToFriendlyUrl, {
  replaceIcelandicCharacters,
} from '../friendlyUrl';

describe('Run tests for friendly url', () => {
  it('Convert string to friendly url string', () => {
    const str = '# // This #is$% SEO friendly url for news ææ#';
    expect(convertToFriendlyUrl(str)).toEqual(
      'this-is-seo-friendly-url-for-news-aeae',
    );
  });

  it('Replace char in string', () => {
    const str = replaceIcelandicCharacters('Hæ þú Ólafur Jón');
    expect(str).toEqual('Hae thu Olafur Jon');
  });
});
