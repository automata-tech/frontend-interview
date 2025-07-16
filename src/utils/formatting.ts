export function formatPhoneNumber(phone: string): string {
  // BUG: No input validation - will crash on null/undefined
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

export function formatCurrency(amount: number): string {
  // BUG: No null/undefined check
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: string): string {
  // BUG: No error handling for invalid dates
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}