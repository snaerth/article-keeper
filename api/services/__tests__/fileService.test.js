import {
  createFile,
  fileExists,
  deleteFile,
  checkFileAndDelete,
  createDefaultDirectorys,
  deleteDefaultDirectorys,
} from '../fileService';

const createFilePath1 = './api/services/__tests__/test.txt';
const createFilePath2 = './api/services/__tests__/test.txt';

beforeAll(async () => {
  // Create fake files
  await createFile(createFilePath1, 'This is a test');
  await createFile(createFilePath2, 'This is a test2');
});

describe('Test all methods in fileService', () => {
  test(`Check if ${createFilePath1} exist in file system`, async () => {
    try {
      const res = await fileExists(createFilePath1);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
    }
  });

  test(`Delete file ${createFilePath1} in file system`, async () => {
    try {
      const res = await deleteFile(createFilePath1);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
    }
  });

  test(`Check file ${createFilePath1} and then delete in file system`, async () => {
    try {
      const res = await checkFileAndDelete(createFilePath2);
      expect(res).toBe(createFilePath2);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
    }
  });

  test('Create directorys', () => {
    try {
      const res = createDefaultDirectorys([
        'api/services/__tests__/testFolder',
      ]);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
    }
  });

  test('Delete directorys', () => {
    try {
      const res = deleteDefaultDirectorys([
        'api/services/__tests__/testFolder',
      ]);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
    }
  });
});
