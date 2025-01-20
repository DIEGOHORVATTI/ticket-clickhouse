import { error } from 'elysia'

export function validateDocument(document: string) {
  // Remove non-numeric characters
  const cleanDoc = document.replace(/\D/g, '')

  if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
    throw error('Bad Request', { error: 'Documento inválido. Deve ser CPF (11 dígitos) ou CNPJ (14 dígitos)' })
  }

  if (cleanDoc.length === 11) {
    return validateCPF(cleanDoc)
  }

  return validateCNPJ(cleanDoc)
}

function validateCPF(cpf: string): boolean {
  // Check for known invalid CPFs
  if (/^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  let remainder: number

  // First digit validation
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  // Second digit validation
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

function validateCNPJ(cnpj: string): boolean {
  // Check for known invalid CNPJs
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  let size = cnpj.length - 2
  let numbers = cnpj.substring(0, size)
  const digits = cnpj.substring(size)
  let sum = 0
  let pos = size - 7

  // First digit validation
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  // Second digit validation
  size = size + 1
  numbers = cnpj.substring(0, size)
  sum = 0
  pos = size - 7

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false

  return true
}
