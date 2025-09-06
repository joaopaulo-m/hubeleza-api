import type { IPartnerRepository } from "../../contracts/repos/partner"
import type { FetchPartersDto } from "./get-all"
import { PartnerMapper } from "../../mappers/partner"
import { stringify } from 'csv-stringify/sync'
import type { PartnerDto } from "../../dtos/partner"

export class ExportPartnersUseCase {
  constructor(private readonly partnerRepo: IPartnerRepository) {}

  async execute(props: FetchPartersDto): Promise<Buffer> {
    const partners = await this.partnerRepo.getAll(props)
    const partnersDto: PartnerDto[] = partners.map(PartnerMapper.toDto)

    const records = partnersDto.map(p => ({
      ID: p.id,
      Nome: p.name,
      Empresa: p.company_name,
      CPF: p.cpf,
      CNPJ: p.cnpj ?? '',
      Status: p.status,
      Email: p.email,
      Criado_em: new Date(p.created_at).toLocaleDateString('pt-BR'),
      Telefone: p.phone_number,
      CEP: p.cep,
      Cidade: p.city,
      Estado: p.state,
      Localização: `${p.lat}, ${p.lng}`,
      Tratamentos: p.treatments.map(t => t.name).join(', '),
    }))

    const csv = stringify(records, {
      header: true,
      delimiter: ';',
      quoted: true, // ← Adicione isso para campos com vírgulas/caracteres especiais
      columns: [ // ← Defina explicitamente as colunas para garantir ordem
        'ID',
        'Nome', 
        'Empresa',
        'CPF',
        'CNPJ',
        'Status',
        'Email',
        'Criado_em',
        'Telefone',
        'CEP',
        'Cidade',
        'Estado',
        'Localização',
        'Tratamentos'
      ]
    })

    // Adicionar BOM para UTF-8 (melhora compatibilidade com Excel)
    const bom = '\uFEFF'
    return Buffer.from(bom + csv, 'utf-8')
  }
}
