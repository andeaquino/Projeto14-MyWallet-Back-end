export default class UnauthorizedError extends Error {
  constructor() {
    super("Erro de autenticação!");
    this.name = "UnauthorizedError";
  }
}
