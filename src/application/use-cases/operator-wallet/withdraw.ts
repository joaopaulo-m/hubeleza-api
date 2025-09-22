import type { PixAddressKeyType } from "../../../shared/enums/pix-address-key-type";
import { isPastFifthBusinessDay } from "../../../utils/is-path-fifth-business-day";
import type { IOperatorRepository } from "../../contracts/repos/operator";
import type { IOperatorWalletRepository } from "../../contracts/repos/operator-wallet";
import type { IPaymentService } from "../../contracts/services/payment";

export interface WithdrawOperatorWalletDto {
  operator_id: string
  pix_address_key_type: string
  pix_address_key: string
  amount: number
}

export class WithdrawOperatorWalletUseCase {
  constructor(
    private readonly operatorRepo: IOperatorRepository,
    private readonly operatorWalletRepo: IOperatorWalletRepository,
    private readonly paymentService: IPaymentService
  ){}

  async execute(props: WithdrawOperatorWalletDto): Promise<Error | void> {
    const operator = await this.operatorRepo.findById(props.operator_id)

    if (!operator) {
      return new Error("Operator not found")
    }

    const operatorWallet = await this.operatorWalletRepo.findByOperatorId(operator.id)

    if (!operatorWallet) {
      return new Error("Operator wallet not found")
    }

    if (!isPastFifthBusinessDay()) {
      return new Error("Invalid withdraw date")
    }

    if (operatorWallet.hasExpenseTransactionThisMonth()) {
      return new Error("Operator already made a withdraw in the current month")
    }

    const debitOperatorWalletResult = operatorWallet.debit(props.amount)

    if (debitOperatorWalletResult) {
      return debitOperatorWalletResult
    }

    const sendAmountResult = await this.paymentService.sendPixPayment({
      pix_address_key_type: props.pix_address_key_type as PixAddressKeyType,
      pix_address_key: props.pix_address_key,
      amount: props.amount
    })

    if (sendAmountResult instanceof Error) {
      console.error("Error sending pix payment: ", sendAmountResult)

      return sendAmountResult
    } 

    await this.operatorWalletRepo.update(operatorWallet)
    return void 0;
  }
}