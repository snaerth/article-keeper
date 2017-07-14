import {
  createFile,
  fileExists,
  deleteFile,
  checkFileAndDelete,
  createDirectorys,
  deleteDirectorys,
} from '../fileService';

const createFilePath1 = './api/services/__tests__/test.txt';
const createFilePath2 = './api/services/__tests__/test.txt';

beforeAll(async () => {
  // Create fake files
  await createFile(createFilePath1, 'This is a test');
  await createFile(createFilePath2, 'This is a test2');
});

describe('Test all methods in fileService', () => {
  // FileExists
  test(`Check if ${createFilePath1} exist in file system`, async () => {
    try {
      const res = await fileExists(createFilePath1);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });

  // Delete file
  test(`Delete file ${createFilePath1} in file system`, async () => {
    try {
      const res = await deleteFile(createFilePath1);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });

  // Check if file exist and delete
  test(`Check file ${createFilePath1} and then delete in file system`, async () => {
    try {
      const res = await checkFileAndDelete(createFilePath2);
      expect(res).toBe(createFilePath2);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });

  // Create directorys and then delete them
  test('Create directorys and then delete them', async () => {
    try {
      const createResponse = await createDirectorys([
        'api/services/__tests__/testFolder',
      ]);
      expect(createResponse).toBe(undefined);

      const deleteResponse = await deleteDirectorys([
        'api/services/__tests__/testFolder',
      ]);
      expect(deleteResponse).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });
});
