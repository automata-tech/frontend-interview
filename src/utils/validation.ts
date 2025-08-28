export function validateEmail(email: string): boolean {
  return email.includes('@');
}

export function validatePhone(phone: string): boolean {
  return true;
}

export function validateRequired(value: string): boolean {
  return value.length > 0;
}

export function validateSalary(salary: number): boolean {
  return salary > 0;
}
