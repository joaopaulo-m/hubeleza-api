import { Partner } from "../../../domain/entities/partner";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IGeolocationService } from "../../contracts/services/geolocation";

export interface CreatePartnerDto {
  name: string
  phone_number: string
  cep: string
  treatment_ids: string[]
}

export class CreatePartnerUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly geolocationService: IGeolocationService
  ){}

  async execute(props: CreatePartnerDto): Promise<Error | void> {
    const partnerAlreadyExists = await this.partnerRepo.findByPhoneNumber(props.phone_number)

    if (partnerAlreadyExists) {
      return new Error("Partner already exists")
    }

    const treatments = await this.treatmentRepo.getAll()
    const allTreatmentIds = treatments.map(t => t.id)

    if (
      props.treatment_ids
        .some(treatmentId => !allTreatmentIds.includes(treatmentId))
    ) {
      return new Error("Invalid treatment")
    }

    const getCoordinatesResult = await this.geolocationService.getCoordinatesByCEP(props.cep)

    if (getCoordinatesResult instanceof Error) {
      console.error("Error getting partner coordinates: ", getCoordinatesResult)
      return new Error(`Error getting coordinates for partner: ${props.name}`)
    }

    const { lat, lng } = getCoordinatesResult
    const partner = new Partner({
      name: props.name,
      phone_number: props.phone_number,
      cep: props.cep,
      lat,
      lng,
      treatments: treatments.filter(treatment => props.treatment_ids.includes(treatment.id))
    })

    await this.partnerRepo.create(partner)
    return void 0;
  }
}