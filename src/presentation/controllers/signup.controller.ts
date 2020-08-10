import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }

    return {
      statusCode: 500,
      body: new Error('Internal server error'),
    };
  }
}
