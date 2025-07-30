import { PhoneNumberFormatter } from "../../utils/phone-number-formater"
import type { Lead } from "../entities/lead"

export const createSendLeadToPartnerMessage = (lead: Lead): string => {
  return `
    Você tem um novo lead próximo da sua clínica!

    👤 Nome: ${lead.name}
    📞 Telefone: ${PhoneNumberFormatter.formatToDisplay(lead.phone_number)}
    📍 CEP: ${lead.cep}
    💡 Tratamentos de interesse: ${lead.treatments.join(", ")}

    👉 Entre em contato o quanto antes para oferecer seu atendimento e tirar dúvidas!

    Quanto mais rápido for o retorno, maiores as chances de conversão. 🚀
  `
}