import type { IFormRepository } from "../../../application/contracts/repos/form";
import { FormMapper } from "../../../application/mappers/form";
import type { Form } from "../../../domain/entities/form";
import { prisma } from "../../services/prisma";

export class PrismaFormRepository implements IFormRepository {
  async countByTreatment(treatment_id: string): Promise<number> {
    return prisma.form.count({
      where: {
        treatment_id
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
      }
    })

    if (!form) return null;

    return FormMapper.toDomain(form);
  }

  async findByExternalId(id: string) {
    const form = await prisma.form.findFirst({
      where: {
        external_form_id: id
      }
    })

    if (!form) return null;

    return FormMapper.toDomain(form);
  }

  async getAll() {
    const forms = await prisma.form.findMany();

    return forms.map(FormMapper.toDomain);
  }

  async create(form: Form) {
    const formData = FormMapper.toPersistence(form);

    await prisma.form.create({
      data: formData
    });
  }

  async update(form: Form) {
    const data = {
      ...FormMapper.toPersistence(form),
      id: undefined,
      treatment_id: undefined
    }

    await prisma.form.update({
      where: {
        id: form.id
      },
      data
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