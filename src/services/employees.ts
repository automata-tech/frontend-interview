import { apiClient } from './api'
import type { Employee, CreateEmployeeData } from '../types/employee'

interface JSONPlaceholderUser {
  id: number
  name: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    city: string
    zipcode: string
  }
  company: {
    name: string
    catchPhrase: string
  }
}

// Mock departments and roles for demo purposes
const mockDepartments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
const mockRoles = ['Developer', 'Manager', 'Analyst', 'Coordinator', 'Director']

function transformUser(user: JSONPlaceholderUser): Employee {
  return {
    ...user,
    department: mockDepartments[user.id % mockDepartments.length],
    role: mockRoles[user.id % mockRoles.length],
    hireDate: new Date(2020 + (user.id % 4), user.id % 12, user.id % 28 + 1).toISOString().split('T')[0],
    salary: 50000 + (user.id * 5000)
  }
}

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    const users = await apiClient.get<JSONPlaceholderUser[]>('/users')
    return users.map(transformUser)
  },

  async getEmployee(id: number): Promise<Employee> {
    const user = await apiClient.get<JSONPlaceholderUser>(`/users/${id}`)
    return transformUser(user)
  },

  async createEmployee(data: CreateEmployeeData): Promise<Employee> {
    // JSONPlaceholder doesn't actually create, but returns a mock response
    const mockUser: JSONPlaceholderUser = {
      id: Date.now(), // Mock ID
      name: data.name,
      email: data.email,
      phone: data.phone,
      website: `https://${data.name.toLowerCase().replace(' ', '')}.example.com`,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        zipcode: '12345'
      },
      company: {
        name: 'Acme Corp',
        catchPhrase: 'Innovation at its finest'
      }
    }
    
    const response = await apiClient.post<JSONPlaceholderUser>('/users', mockUser)
    return {
      ...transformUser(response),
      department: data.department,
      role: data.role,
      hireDate: data.hireDate,
      salary: data.salary
    }
  },

  async updateEmployee(id: number, data: Partial<CreateEmployeeData>): Promise<Employee> {
    const existing = await this.getEmployee(id)
    const updated = { ...existing, ...data }
    
    const response = await apiClient.put<JSONPlaceholderUser>(`/users/${id}`, updated)
    return transformUser(response)
  },

  async deleteEmployee(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }
}