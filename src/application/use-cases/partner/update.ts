import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IGeolocationService } from "../../contracts/services/geolocation";

export interface UpdatePartnerDto {
  partner_id: string
  name?: string
  company_name?: string
  cpf?: string
  cnpj?: string
  phone_number?: string
  cep?: string
  city?: string
  state?: string
  treatment_ids?: string[]
}

export class UpdatePartnerUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly geolocationService: IGeolocationService
  ){}

  async execute(props: UpdatePartnerDto): Promise<Error | void> {
    const partnerExists = await this.partnerRepo.findById(props.partner_id)

    if (!partnerExists) {
      return new Error("Partner does not exists")
    }

    if (props.name) {
      partnerExists.updateName(props.name)
    }

    if (props.company_name) {
      partnerExists.updateCompanyName(props.company_name)
    }

    if (props.cnpj) {
      partnerExists.updateCnpj(props.cnpj)
    }

    if (props.cpf) {
      partnerExists.updateCpf(props.cpf)
    }

    if (props.phone_number) {
      partnerExists.updatePhoneNumber(props.phone_number)
    }

    if (props.treatment_ids) {
      const treatments = await this.treatmentRepo.getAll()
      const allTreatmentIds = treatments.map(t => t.id)

      if (
        props.treatment_ids
          .some(treatmentId => !allTreatmentIds.includes(treatmentId))
      ) {
        return new Error("Invalid treatment")
      }

      partnerExists.updateTreatments(
        treatments
          .filter(treatment => (props.treatment_ids as string[])
          .includes(treatment.id)
        )
      )
    }

    if (props.cep) {
      const getCoordinatesResult = await this.geolocationService.getCoordinatesByCEP(props.cep)

      if (getCoordinatesResult instanceof Error) {
        console.error("Error getting partner coordinates: ", getCoordinatesResult)
        return new Error(`Error getting coordinates for partner: ${props.name}`)
      }

      const { lat, lng } = getCoordinatesResult
      partnerExists.updateLat(lat)
      partnerExists.updateLng(lng)

      if (props.state && props.city) {
        partnerExists.updateCity(props.city)
        partnerExists.updateState(props.state)
      }
    }
    
    await this.partnerRepo.update(partnerExists)
    return void 0;
  }
}