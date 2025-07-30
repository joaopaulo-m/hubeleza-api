export class PhoneNumberFormatter {
  /**
   * Remove qualquer caractere não numérico e retorna o número limpo.
   * Exemplo: (27) 9 8841-7492 => 27988417492
   */
  static formatToSave(input: string): string {
    return input.replace(/\D/g, '');
  }

  /**
   * Formata um número limpo para o formato (XX) 9 XXXX-XXXX.
   * Exemplo: 27988417492 => (27) 9 8841-7492
   */
  static formatToDisplay(phone: string): string {
    if (phone.length !== 11) return phone; // fallback
    const ddd = phone.slice(0, 2);
    const firstDigit = phone[2];
    const firstPart = phone.slice(3, 7);
    const secondPart = phone.slice(7);
    return `(${ddd}) ${firstDigit} ${firstPart}-${secondPart}`;
  }
}
