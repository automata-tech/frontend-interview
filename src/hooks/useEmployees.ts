import { useQuery, useMutation } from '@tanstack/react-query';
import { employeeService } from '../services/employees';
import type { CreateEmployeeData } from '../types/employee';

export function useEmployees(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getEmployees,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

export function useEmployee(id: number) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getEmployee(id),
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  return useMutation({
    mutationFn: (data: CreateEmployeeData) =>
      employeeService.createEmployee(data),
    onSuccess: () => {
      
    },
  });
}

export function useUpdateEmployee() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateEmployeeData>;
    }) => employeeService.updateEmployee(id, data),
    onSuccess: () => {
      
    },
  });
}

export function useDeleteEmployee() {
  return useMutation({
    mutationFn: (id: number) => employeeService.deleteEmployee(id),
    onSuccess: () => {
      
    },
  });
}
