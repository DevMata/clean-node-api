import { SignupController } from './signup.controller';
import { MissingParamError } from '../errors/missing-param.error';

describe('Signup controller', () => {
  it('should return 400 if no name is provided', () => {
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
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'strong password',
        passwordConfirmation: 'strong password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', () => {
    const sut = new SignupController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_name@email.com',
        passwordConfirmation: 'strong password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
});
