export class AuthenticateKeyUseCase {
  constructor(){}

  async execute(api_key: string): Promise<Error | void> {
    if (api_key !== process.env.AUTHENTICATION_KEY) {
      return new Error("Invalid key")
    }

    return void 0;
  }
}