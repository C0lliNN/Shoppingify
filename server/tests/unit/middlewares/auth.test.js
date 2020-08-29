const authMiddleware = require('../../../middlewares/auth');
const { User } = require('../../../models/user');

describe('auth middleware', () => {
  it('should add a user property matching the user data', () => {
    const user = new User({
      name: 'Raphael Collin',
      email: 'raphael@test.com',
      password: '112111111',
    });
    const token = user.generateToken();

    const request = {
      header: jest.fn().mockReturnValue(`Bearer ${token}`),
      setHeader: jest.fn(),
    };

    const response = {};

    const next = jest.fn();

    authMiddleware(request, response, next);

    expect(request.user).toBeTruthy();
    expect(request.user._id).toBe(user.id);
  });
});
