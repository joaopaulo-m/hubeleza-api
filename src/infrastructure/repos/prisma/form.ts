import { randomUUID } from "node:crypto";

import type { FetchFormsOptions, IFormRepository } from "../../../application/contracts/repos/form";
import { FormMapper } from "../../../application/mappers/form";
import type { Form } from "../../../domain/entities/form";
import { prisma } from "../../services/prisma";

export class PrismaFormRepository implements IFormRepository {
  async countByTreatment(treatment_id: string): Promise<number> {
    return prisma.form.count({
      where: {
        treatments: {
          some: {
            treatment_id
          }
        }
      }
    })
  }
  
  async countAll(): Promise<number> {
    return prisma.form.count()
  }
  
  async findById(id: string) {
    const form = await prisma.form.findUnique({
      where: {
        id
      },
      include: {
        treatments: {
          include: {
            treatment: {
              include: {
                state_prices: true
              }
            }
          }
        }
      }
    })

    if (!form) return null;

    return FormMapper.toDomain(form);
  }

  async findByExternalId(id: string) {
    const form = await prisma.form.findFirst({
      where: {
        external_form_id: id
      },
      include: {
        treatments: {
          include: {
            treatment: {
              include: {
                state_prices: true
              }
            }
          }
        }
      }
    })

    if (!form) return null;

    return FormMapper.toDomain(form);
  }

  async getAll(props?: FetchFormsOptions) {
    const forms = await prisma.form.findMany({
      where: {
        name: props?.name
          ? {
              contains: props.name,
              mode: "insensitive"
            }
          : undefined,
        treatments: {
          some: {
            treatment_id: {
              in: props?.treatment_ids
            }
          }
        }
      },
      include: {
        treatments: {
          include: {
            treatment: {
              include: {
                state_prices: true
              }
            }
          }
        }
      },
      orderBy: {
        name: "asc"
      }
    });

    return forms.map(FormMapper.toDomain);
  }

  async create(form: Form) {
    const data = {
      ...FormMapper.toPersistence(form),
      treatments: undefined
    }

    await prisma.form.create({
      data: {
        ...data,
        treatments: {
          createMany: {
            data: form.treatments.map(treatment => {
              return {
                id: randomUUID(),
                treatment_id: treatment.id
              }
            }),
            skipDuplicates: true
          }
        }
      }
    });
  }

  async update(form: Form) {
    const data = {
      ...FormMapper.toPersistence(form),
      id: undefined,
      treatments: undefined
    }

    await prisma.form.update({
      where: {
        id: form.id
      },
      data: {
        ...data,
        treatments: {
          deleteMany: {},
          createMany: {
            data: form.treatments.map(treatment => {
              return {
                id: randomUUID(),
                treatment_id: treatment.id
              }
            }),
            skipDuplicates: true
          }
        }
      }
    });
  }

  async delete(id: string) {
    await prisma.form.delete({
      where: {
        id
      }
    });
  }
}