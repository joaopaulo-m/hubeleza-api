import puppeteer from "puppeteer";

import type { GenerateContractProps, IContractService } from "../../application/contracts/services/contract";
import { PARTNER_CONTRACT_PDF } from "../../shared/constants/partner-contract-html";

export class PuppeteerContractService implements IContractService {
  async generatePDF(data: GenerateContractProps): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(PARTNER_CONTRACT_PDF({
      client_name: data.client_name,
      company_name: data.company_name,
      cpf: data.cpf,
      city: data.city,
      state: data.state
    }), { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
