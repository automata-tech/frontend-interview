export function validateEmail(email: string): boolean {
  // BUG: Very basic email validation - missing edge cases
  return email.includes('@')
}

export function validatePhone(phone: string): boolean {
  // BUG: No validation at all
  return true
}

export function validateRequired(value: string): boolean {
  // BUG: Only checks for empty string, not whitespace
  return value.length > 0
}

export function validateSalary(salary: number): boolean {
  // BUG: No minimum/maximum validation
  return salary > 0
}