enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  PRECONDITION_FAILED = 412,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export default HttpStatusCode;
