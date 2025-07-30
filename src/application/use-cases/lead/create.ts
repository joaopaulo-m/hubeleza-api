import { Lead } from "../../../domain/entities/lead";
import type { ILeadRepository } from "../../contracts/repos/lead";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IGeolocationService } from "../../contracts/services/geolocation";

export interface CreateLeadDto {
  treatment_id: string
  name: string
  phone_number: string
  cep: string
}

export class CreateLeadUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly geolocationService: IGeolocationService
  ){}

  async execute(props: CreateLeadDto): Promise<Error | Lead> {
    const leadAlreadyExists = await this.leadRepo.findByPhoneNumber(props.phone_number)

    if (leadAlreadyExists) {
      return new Error("Lead already exists")
    }

    const treatmentExists = await this.treatmentRepo.findById(props.treatment_id)

    if (!treatmentExists) {
      return new Error("Treatment does not exists")
    }

    const getCoordinatesResult = await this.geolocationService.getCoordinatesByCEP(props.cep)

    if (getCoordinatesResult instanceof Error) {
      console.error("Error getting coordinates: ", getCoordinatesResult)
      console.error(`Error getting coordinates for lead '${props.phone_number}'`)
      return new Error("Error getting lead coordinates")
    }
    
    const { lat, lng } = getCoordinatesResult
    const lead = new Lead({
      name: props.name,
      phone_number: props.phone_number,
      cep: props.cep,
      lat,
      lng,
      treatments: [treatmentExists]
    })

    await this.leadRepo.create(lead)
    return lead
  }
} 