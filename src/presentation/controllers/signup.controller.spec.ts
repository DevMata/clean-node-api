import { SignupController } from './signup.controller';
import { MissingParamError } from '../errors/missing-param.error';
import { InvalidParamError } from '../errors/invalid-param.error';
import { EmailValidator } from '../protocols/email-validator';

interface SutTypes {
  sut: SignupController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  return {
    emailValidatorStub,
    sut: new SignupController(emailValidatorStub),
  };
};

describe('Signup controller', () => {
  it('should return 400 if no name is provided', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  it('should return 400 if no password confirmation is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_name@email.com',
        password: 'strong password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'strong password',
        passwordConfirmation: 'strong password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should call email validator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'strong password',
        passwordConfirmation: 'strong password',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
