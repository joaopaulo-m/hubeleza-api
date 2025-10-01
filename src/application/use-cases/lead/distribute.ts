import { AffiliateCommissionType } from "../../../shared/enums/affiliate-comission-type";
import type { IAffiliateRepository } from "../../contracts/repos/affiliate";
import type { IConfigRepository } from "../../contracts/repos/config";
import type { IFormRepository } from "../../contracts/repos/form";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { IQueueService } from "../../contracts/services/queue";
import type { AddAffiliateComissionUseCase } from "../affiliate/add-comission";
import type { CreateLeadUseCase } from "./create";

export interface DistributeLeadDto {
  form_id: string;
  name: string;
  phone_number: string;
  cep: string;
  affiliate_code?: string;
}

export class DistributeLeadUseCase {
  constructor(
    private readonly formRepo: IFormRepository,
    private readonly partnerRepo: IPartnerRepository,
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly queueService: IQueueService,
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly addAffiliateComissionUseCase: AddAffiliateComissionUseCase
  ) {}

  async execute(props: DistributeLeadDto): Promise<Error | void> {
    const leadForm = await this.formRepo.findByExternalId(props.form_id);

    if (!leadForm) {
      return new Error("Form not found");
    }

    const createLeadResult = await this.createLeadUseCase.execute({
      treatment_ids: leadForm.treatments.map(treatment => treatment.id),
      name: props.name,
      phone_number: props.phone_number,
      cep: props.cep
    })

    if (createLeadResult instanceof Error) {
      return createLeadResult;
    }

    const lead = createLeadResult;
    const leadPartners = await this.partnerRepo.findNearestPartners({
      lat: lead.lat,
      lng: lead.lng,
      limit: 5
    })
    
    for (const partner of leadPartners) {
      await this.queueService.add({
        name: "send_lead_to_partner",
        data: {
          partner_id: partner.id,
          lead_id: lead.id,
          treatment_ids: lead.treatments.map(treatment => treatment.id)
        }
      })
    }

    if (props.affiliate_code) {
      const affiliate = await this.affiliateRepo.findByReferralCode(props.affiliate_code)

      if (affiliate) {
        const addAffiliateComissionResult = await this.addAffiliateComissionUseCase.execute({
          affiliate_id: affiliate.id,
          type: AffiliateCommissionType.LEAD_REFERRAL,
          lead_id: createLeadResult.id
        })

        if (addAffiliateComissionResult instanceof Error) {
          console.error("Error adding affiliate comission: ", addAffiliateComissionResult)
        }
      }
    }

    return void 0;
  }
}