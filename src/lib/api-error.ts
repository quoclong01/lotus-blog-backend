export class APIError {
  name: any;
  status: any;
  message: any;
  errors: any;

  constructor(name: any, status: any, message: any, errors: any = []) {
    Object.assign(this, {
      name,
      status,
      message,
      errors
    });
  }
}
