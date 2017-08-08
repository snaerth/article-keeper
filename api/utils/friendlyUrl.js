const icelandicLettersArr = [
  'ð',
  'Ð',
  'þ',
  'Þ',
  'æ',
  'Æ',
  'ö',
  'Ö',
  'á',
  'Á',
  'é',
  'É',
  'í',
  'Í',
  'ó',
  'Ó',
  'ú',
  'Ú',
  'ý',
  'Ý',
];

const replacements = [
  'd',
  'D',
  'th',
  'Th',
  'ae',
  'Ae',
  'o',
  'O',
  'a',
  'A',
  'e',
  'E',
  'i',
  'I',
  'o',
  'O',
  'u',
  'U',
  'y',
  'Y',
];

/**
 * Replaces icelandic letters from string and puts non icelandic instead
 * @param {String} str
 */
export function replaceIcelandicCharacters(str) {
  let newStr = str;
  for (let i = 0; i < icelandicLettersArr.length; i++) {
    newStr = newStr.replace(
      new RegExp(`[${icelandicLettersArr[i]}]`, 'g'),
      replacements[i],
    );
  }

  return newStr;
}

/**
 * Converts string to url friendly string
 * @param {String} str
 */
export default function convertToFriendlyUrl(str) {
  const replacedStr = replaceIcelandicCharacters(str);

  return replacedStr
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}
