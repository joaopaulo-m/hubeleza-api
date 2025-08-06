import { Form } from "../../domain/entities/form"
import type { FormDto } from "../dtos/form"
import { TreatmentMapper, type PersistenceTreatment } from "./treatment"

export type PersistenceForm = {
  id: string
  name: string
  external_form_id: string
  treatments: {
    treatment: PersistenceTreatment
  }[]
}

export class FormMapper {
  static toDomain(raw: PersistenceForm): Form {
    return new Form({
      id: raw.id,
      name: raw.name,
      external_form_id: raw.external_form_id,
      treatments: raw.treatments.map(t => {
        return TreatmentMapper.toDomain(t.treatment)
      })
    })
  }

  static toPersistence(domain: Form): PersistenceForm {
    return {
      id: domain.id,
      name: domain.name,
      external_form_id: domain.external_form_id,
      treatments: []
    }
  }

  static toDto(domain: Form): FormDto {
    return {
      id: domain.id,
      name: domain.name,
      external_form_id: domain.external_form_id,
      treatments: domain.treatments.map(TreatmentMapper.toDto)
    }
  }
}