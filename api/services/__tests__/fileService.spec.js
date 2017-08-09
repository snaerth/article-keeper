import {
  createFile,
  fileExists,
  deleteFile,
  checkFileAndDelete,
  createDirectorys,
  deleteDirectorys,
  renameFile,
} from '../fileService';

const createFilePath1 = './api/services/__tests__/test.txt';
const renameFilePath = './api/services/__tests__/testRenamed.txt';
const createFilePath2 = './api/services/__tests__/test2.txt';

beforeAll(async (done) => {
  try {
    // Create fake files
    await createFile(createFilePath1, 'Test 1');
    await createFile(createFilePath2, 'Test 2');
    await createFile(renameFilePath, 'Test 3');
    done();
  } catch (error) {
    throw new Error(error);
  }
});

describe('Test all methods in fileService', () => {
  // FileExists
  test(`Check if ${createFilePath1} exist in file system`, async () => {
    try {
      const res = await fileExists(createFilePath1);
      expect(res).toBe(true);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });

  // Delete file
  test(`Delete file ${createFilePath1} in file system`, async () => {
    try {
      const res = await deleteFile(createFilePath1);
      expect(res).toBe(createFilePath1);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });

  // Rename file
  test(`Rename file ${createFilePath1} in file system`, async () => {
    try {
      const renameResponse = await renameFile(renameFilePath, renameFilePath);
      expect(renameResponse).toBe(renameFilePath);
      const deleteResponse = await deleteFile(renameFilePath);
      expect(deleteResponse).toBe(renameFilePath);
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

  // Create directorys
  test('Create directorys', async () => {
    try {
      const res = await createDirectorys(['api/services/__tests__/testFolder']);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });

  // Delete directorys
  test('Delete directorys', async () => {
    try {
      const res = await deleteDirectorys(['api/services/__tests__/testFolder']);
      expect(res).toBe(undefined);
    } catch (error) {
      expect(error).toThrowErrorMatchingSnapshot();
      throw new Error(error);
    }
  });
});
