import { useEmployees } from '../../hooks/useEmployees'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { EmployeeTable } from './EmployeeTable'
import { EmployeeSearch } from './EmployeeSearch'
import { useState, useEffect } from 'react'

export function EmployeeList() {
  const { data: employees, isLoading, error } = useEmployees()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')

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
    
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment
    return matchesSearch && matchesDepartment
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