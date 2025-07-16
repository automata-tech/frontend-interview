import { useEmployees } from '../../hooks/useEmployees'
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { EmployeeTable } from './EmployeeTable'
import { EmployeeSearch } from './EmployeeSearch'
import { useState, useEffect } from 'react'

export function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  
  const { data: allEmployees, isLoading: allLoading, error: allError } = useEmployees({ enabled: searchTerm.length === 0 })
  const { data: searchResults, isLoading: searchLoading, error: searchError } = useEmployeeSearch(searchTerm)
  
  // Determine which data source to use
  const employees = searchTerm.length > 0 ? searchResults : allEmployees
  const isLoading = searchTerm.length > 0 ? searchLoading : allLoading
  const error = searchTerm.length > 0 ? searchError : allError

  // BUG: Memory leak - missing cleanup in useEffect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchTerm('')
        setFilterDepartment('')
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    // BUG: Missing cleanup - memory leak
    // return () => {
    //   document.removeEventListener('keydown', handleKeyDown)
    // }
  }, [])

  // BUG: Loading state never disappears - condition should be just isLoading
  if (isLoading || true) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading employees: {error.message}</p>
      </div>
    )
  }

  // BUG: No debouncing - performance issue with unnecessary re-renders on every keystroke
  // BUG: Expensive filter operation runs on every render
  const filteredEmployees = employees?.filter(employee => {
    // BUG: This expensive operation runs on every render
    console.log('Filtering employee:', employee.name) // Performance issue
    
    // Search is now handled server-side, only filter by department client-side
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment
    return matchesDepartment
  }) || []

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
  )
}