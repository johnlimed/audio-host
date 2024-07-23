export const mockDB = {
  db: jest.fn(),
  close: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
  archive: jest.fn(),
}