import { AuthenticateKeyUseCase } from "../../../application/use-cases/auth/authenticate-key"
import { AuthenticateKeyController } from "../../../infrastructure/controllers/auth/authenticate-key"

export const makeAuthenticateKeyController = () => {
  const useCase = new AuthenticateKeyUseCase()
  return new AuthenticateKeyController(useCase)
}