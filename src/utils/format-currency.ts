export function formatCurrency(
  valueInCents: number, 
  options: {
    showSymbol?: boolean
    showZero?: boolean
  } = {}
): string {
  const {
    showSymbol = true,
    showZero = true
  } = options
  if (valueInCents === 0 && !showZero) {
    return "Gratuito"
  }

  const valueInReais = valueInCents / 100

  return valueInReais.toLocaleString('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}