/**
 * Splits array into chunks
 * Example: splitToChunks([1,2,3,4,5,6,7,8,9], 3) -> [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @param {Array} arr
 * @param {Number} chunk
 * @returns {Array}
 */
export default function splitToChunks(arr, chunk) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunk) {
    chunks.push(arr.slice(i, i + chunk));
  }

  return chunks;
}
