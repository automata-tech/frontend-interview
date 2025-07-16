import { apiClient } from './api'
import type { Employee, CreateEmployeeData } from '../types/employee'

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    return await apiClient.get<Employee[]>('/employees')
  },

  async getEmployee(id: number): Promise<Employee> {
    return await apiClient.get<Employee>(`/employees/${id}`)
  },

  async createEmployee(data: CreateEmployeeData): Promise<Employee> {
    return await apiClient.post<Employee>('/employees', data)
  },

  async updateEmployee(id: number, data: Partial<CreateEmployeeData>): Promise<Employee> {
    return await apiClient.put<Employee>(`/employees/${id}`, data)
  },

  async deleteEmployee(id: number): Promise<void> {
    await apiClient.delete(`/employees/${id}`)
  }
}