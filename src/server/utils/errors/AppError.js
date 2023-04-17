export default class AppError extends Error {
  constructor(message, status, additionalInfo) {
    super();
    this.message = message;
    this.statusCode = status;
    this.additionalInfo = additionalInfo;
  }

  static NotFound(additionalInfo) {
    return new AppError('The resource was not found', 404, additionalInfo);
  }
}
