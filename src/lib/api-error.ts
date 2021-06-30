export class APIError {
  name: any;
  status: any;
  message: any;
  errors: any;

  constructor(name: any, status: any, message: any, errors: any = []) {
    let err = errors;
    if(!Array.isArray(errors)) {
      err = [errors];
    }
    Object.assign(this, {
      name,
      status,
      message,
      errors: err
    });
  }
}

class ApplicationError {
  status: number | string;
  errors: string[];

  constructor(
    status: string,
    errors: string
  ) {
    this.status = status;
    this.errors = [
      errors
    ]
  }
}

export class PostErrors {
  static NOT_FOUND = new ApplicationError('40401', 'The requested post was not found.')
  static INTERACT_PERMISSION = new ApplicationError('40301', 'You do not have permission to interact this post.')
}

export class UserErrors {
  static LOGIN_FAILED = new ApplicationError('40101', 'Invalid email or password.')
  static LOGOUT_FAILED = new ApplicationError('40102', 'You can not logout with this account.')
  static INVALID_PASSWORD = new ApplicationError('40103', 'Invalid password.')
  static INTERACT_PERMISSION = new ApplicationError('40302', 'You do not have permission to interact this user.')
  static NOT_FOUND = new ApplicationError('40402', 'The requested user was not found.')
  static ALREADY_USER_EXISTED = new ApplicationError('40901', 'This email have already exist.')
  static ALREADY_DISPLAYNAME_EXISTED = new ApplicationError('40902', 'Your display name is already taken.')
}

export class FollowerErrors {
  static NOT_FOUND = new ApplicationError('40403', 'The requested follower was not found')
  static INTERACT_PERMISSION = new ApplicationError('40303', 'You do not have permission to interact this user.')
  static ALREADY_FOLLOWER_EXISTED = new ApplicationError('40903', 'This follower have already exist.')
}

export class S3Errors {
  static UNEXPECTED_ERROR = new ApplicationError('50001', 'Got errors with upload server!')
  static UNSUPPORTED = new ApplicationError('40001', 'API have not supported this type!')
  static MISSING_FIELD = new ApplicationError('40002', 'Not enough data to sign!')
}

