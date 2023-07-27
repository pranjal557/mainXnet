const db = require('../models');

const { getAllUsersLogin, postuserlogin } = require('../controllers/login.controllers');

// Mock the database methods
jest.mock('../models', () => {
  const login = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  return { login };
});

describe('Login Controller', () => {
  // Test the getAllUsersLogin function
  describe('getAllUsersLogin', () => {
    it('should return 200 with login users data', async () => {
      // Mock the database response
      const mockLoginData = [{ id: 1, email: 'user1@example.com' }];

      db.login.findAll.mockResolvedValue(mockLoginData);

      // Mock the Express response object
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call the function
      await getAllUsersLogin({}, res);

      // Check the response
      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({ product: mockLoginData });
    });

    it('should return 500 on error', async () => {
      // Mock the database error
      db.login.findAll.mockRejectedValue(new Error('Database error'));

      // Mock the Express response object
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call the function
      await getAllUsersLogin({}, res);

      // Check the response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: 'error in getting data' });
    });
  });

  // Test the postuserlogin function
  describe('postuserlogin', () => {
    it('should return 200 with success message if valid credentials are provided', async () => {
      // Mock the database response
      const mockUserData = { id: 1, email: 'user1@example.com', password: '12345' };
      db.login.findOne.mockResolvedValue(mockUserData);

      // Mock the Express request and response objects
      const req = { body: { email: 'user1@example.com', password: '12345' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call the function
      await postuserlogin(req, res);

      // Check the response
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', user: mockUserData });
    });

    it('should return 401 if invalid credentials are provided', async () => {
      // Mock the database response
      db.login.findOne.mockResolvedValue(null);

      // Mock the Express request and response objects
      const req = { body: { email: 'invalid@example.com', password: 'invalidpassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call the function
      await postuserlogin(req, res);

      // Check the response
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 200 with success message if valid credentials are provided', async () => {
      // Mock the database response
      const mockUserData = { id: 1, email: 'user1@example.com', password: '12345' };
      db.login.findOne.mockResolvedValue(mockUserData);

      // Mock the Express request and response objects
      const req = { body: { email: 'user1@example.com', password: '12345' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call the function
      await postuserlogin(req, res);

      // Check the response
      expect(res.status).toHaveBeenCalledWith(200); // Corrected the status code to 200
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', user: mockUserData });
    });
  });
});
