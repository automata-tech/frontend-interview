import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../services/employees';

export function useEmployeeSearch(searchTerm: string) {
  return useQuery({
    queryKey: ['employees', 'search', searchTerm],
    queryFn: async () => {
      const employees = await employeeService.getEmployees();

      // BUG: No request cancellation - race condition possible
      // This could cause race conditions when user types quickly
      return employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    enabled: searchTerm.length > 0,
    staleTime: 0, // Always fresh search results
  });
}
