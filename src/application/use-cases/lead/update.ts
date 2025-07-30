import type { ILeadRepository } from "../../contracts/repos/lead"
import type { IGeolocationService } from "../../contracts/services/geolocation"

export interface UpdateLeadDto {
  lead_id: string
  name: string
  phone_number: string
  cep: string
}

export class UpdateLeadUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
    private readonly geolocationService: IGeolocationService
  ){}

  async execute(props: UpdateLeadDto): Promise<Error | void> {
    const lead = await this.leadRepo.findById(props.lead_id)

    if (!lead) {
      return new Error("Lead not found")
    }

    if (props.phone_number) {
      const leadAlreadyExists = await this.leadRepo.findByPhoneNumber(props.phone_number)

      if (leadAlreadyExists && leadAlreadyExists.id !== props.lead_id) {
        return new Error("Lead with this phone number already exists")
      }

      lead.updatePhoneNumber(props.phone_number)
    }

    if (props.cep) {
      const getCoordinatesResult = await this.geolocationService.getCoordinatesByCEP(props.cep)

      if (getCoordinatesResult instanceof Error) {
        console.error("Error getting coordinates: ", getCoordinatesResult)
        console.error(`Error getting coordinates for lead '${lead.phone_number}'`)
        return new Error("Error getting lead coordinates")
      }
      
      const { lat, lng } = getCoordinatesResult
      lead.updateCep(props.cep)
      lead.updateLat(lat)
      lead.updateLng(lng)
    }
    
    await this.leadRepo.update(lead)
  }
}