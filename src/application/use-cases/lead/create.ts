import { Lead } from "../../../domain/entities/lead";
import type { ILeadRepository } from "../../contracts/repos/lead";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IGeolocationService } from "../../contracts/services/geolocation";

export interface CreateLeadDto {
  treatment_ids: string[]
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

    const allTreatments = await this.treatmentRepo.getAll()

    if (!props.treatment_ids.some(treatmentId => allTreatments.map(t => t.id).includes(treatmentId))) {
      return new Error("Some treatment does not exists")
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
      treatments: props.treatment_ids.map(treatmentId => {
        const index = allTreatments.findIndex(treatment => treatment.id === treatmentId) as number

        return allTreatments[index]
      })
    })

    await this.leadRepo.create(lead)
    return lead
  }
} 