import { ComissionType } from "../../../shared/enums/comission-type";
import type { IOperatorTransactionRepository } from "../../contracts/repos/operator-transaction";
import type { IPartnerRepository } from "../../contracts/repos/partner";

export interface OperatorDashboardData {
  sign_up_comission_amount: number
  topup_comission_amount: number
  total_partners: number
}

export class GetOperatorDashboardDataUseCase {
  constructor(
    private readonly operatorTransactionRepo: IOperatorTransactionRepository,
    private readonly partnerRepo: IPartnerRepository
  ) {}

  async execute(operator_id: string): Promise<OperatorDashboardData> {
    const [
      signUpComissionAmount,
      topupComissionAmount,
      totalPartners
    ] = await Promise.all([
      this.operatorTransactionRepo.countAllAmount({ operator_id, comission_type: ComissionType.SIGN_UP }),
      this.operatorTransactionRepo.countAllAmount({ operator_id, comission_type: ComissionType.TOPUP }),
      this.partnerRepo.countByOperator(operator_id)
    ]);

    return {
      sign_up_comission_amount: signUpComissionAmount,
      topup_comission_amount: topupComissionAmount,
      total_partners: totalPartners
    }
  }
}
