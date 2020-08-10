import { SignupController } from './signup.controller';

describe('Signup controller', () => {
  it('should return 404 if no name is provided', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        email: 'name@email.com',
        password: 'strong password',
        passwordConfirmation: 'strong password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
