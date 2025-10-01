import { useEmployees } from '../../hooks/useEmployees';
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { EmployeeTable } from './EmployeeTable';
import { EmployeeSearch } from './EmployeeSearch';
import { useState, useEffect } from 'react';

export function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const {
    data: allEmployees,
    isLoading: allLoading,
    error: allError,
  } = useEmployees({ enabled: searchTerm.length === 0 });
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useEmployeeSearch(searchTerm);

  const employees = searchTerm.length > 0 ? searchResults : allEmployees;
  const isLoading = searchTerm.length > 0 ? searchLoading : allLoading;
  const error = searchTerm.length > 0 ? searchError : allError;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchTerm('');
        setFilterDepartment('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

  }, []);

  if (isLoading || true) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading employees: {error.message}</p>
      </div>
    );
  }

  const filteredEmployees =
    employees?.filter((employee) => {
      const matchesDepartment =
        !filterDepartment || employee.department === filterDepartment;
      return matchesDepartment;
    }) || [];

  return (
    <div className="space-y-6">
      <EmployeeSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterDepartment={filterDepartment}
        onDepartmentChange={setFilterDepartment}
      />

      <EmployeeTable employees={filteredEmployees} />
    </div>
  );
}
